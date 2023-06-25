import { createSelector } from '@reduxjs/toolkit';
import { Fragment, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { css } from 'styled-system/css';

import { variableCollectionsSelectors } from '~/features/variable-collections/variable-collections.slice';
import { variablesSelectors } from '~/features/variables/variables.slice';
import { useRuntime } from '~/runtime';
import {
  rgbaSchema,
  Variable,
  VariableAlias,
  VariableCollection,
  VariableValue,
} from '~/schema';
import { RootState } from '~/store';

import { ResizeHandle } from '../resize-handle';
import { ScrollArea } from '../scroll-area';
import { SidebarAccordion, SidebarAccordionRoot } from '../sidebar-accordion';
import { SidebarButton } from '../sidebar-button';

function isAlias(value: VariableValue): value is VariableAlias {
  return (
    typeof value === 'object' &&
    'type' in value &&
    value.type === 'VARIABLE_ALIAS'
  );
}

const selectGroupedVariables = createSelector(
  [(state: RootState) => state.variables, (state, ids: string[]) => ids],
  (variables, ids) => {
    const groups = new Map<
      string,
      [
        Variable,
        Record<string, [Exclude<VariableValue, VariableAlias>, Variable]>
      ][]
    >();

    function resolveValue(
      collectionId: string,
      modeId: string,
      variable: Variable,
      value: VariableValue
    ): [Exclude<VariableValue, VariableAlias>, Variable] {
      if (isAlias(value)) {
        const resolvedVariable = variablesSelectors.selectById(
          variables,
          value.id
        );

        let resolvedValue: VariableValue;

        if (
          resolvedVariable.variableCollectionId === collectionId &&
          modeId in resolvedVariable.valuesByMode
        ) {
          // If the variable is in the same collection and has a value for the
          // current mode, use that value.
          resolvedValue = resolvedVariable.valuesByMode[modeId];
        } else {
          // Otherwise, use the first value in the variable's collection.
          resolvedValue = Object.values(resolvedVariable.valuesByMode)[0];
        }

        return resolveValue(
          collectionId,
          modeId,
          resolvedVariable,
          resolvedValue
        );
      } else {
        return [value, variable];
      }
    }

    for (const id of ids) {
      const variable = variablesSelectors.selectById(variables, id);
      const parts = variable.name.split('/');

      const groupName = parts.length > 1 ? parts[0] : '';
      const group = groups.get(groupName);

      const resolvedValuesByMode = Object.fromEntries(
        Object.entries(variable.valuesByMode).map(([modeId, value]) => {
          return [
            modeId,
            resolveValue(
              variable.variableCollectionId,
              modeId,
              variable,
              value
            ),
          ];
        })
      );

      if (group) {
        group.push([variable, resolvedValuesByMode]);
      } else {
        groups.set(groupName, [[variable, resolvedValuesByMode]]);
      }
    }

    return groups;
  }
);

const CollectionAccordion = (props: {
  collection: VariableCollection;
  selection: string[];
  setSelection: (selection: string[]) => void;
}) => {
  const { collection, selection, setSelection } = props;

  const groups = useSelector(
    useMemo(
      () => (state: RootState) =>
        selectGroupedVariables(state, collection.variableIds),
      [collection.variableIds]
    )
  );

  return (
    <SidebarAccordion value={collection.id} label={collection.name}>
      {[
        {
          name: 'All Variables',
          path: [collection.id],
          count: collection.variableIds.length,
        },
        ...Array.from(groups.entries())
          .filter(([name]) => {
            return name !== '';
          })
          .map(([groupName, variables]) => {
            return {
              name: groupName,
              path: [collection.id, groupName],
              count: variables.length,
            };
          }),
      ].map(({ name, path, count }) => {
        return (
          <SidebarButton
            key={name}
            data-state={
              path.join('/') === selection.join('/') ? 'active' : 'inactive'
            }
            endContent={count}
            onClick={() => {
              setSelection(path);
            }}
          >
            {name}
          </SidebarButton>
        );
      })}
    </SidebarAccordion>
  );
};

function componentToHex(c: number) {
  const hex = ((c * 255) | 0).toString(16).toUpperCase();
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(color: { r: number; g: number; b: number }) {
  const { r, g, b } = color;
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const CollectionGrid = (props: {
  collection: VariableCollection;
  selection: string[];
}) => {
  const { collection, selection } = props;

  const groups = useSelector(
    useMemo(
      () => (state: RootState) =>
        selectGroupedVariables(state, collection.variableIds),
      [collection.variableIds]
    )
  );

  const [collectionId, groupName] = selection;

  return (
    <table
      className={css({
        textStyle: 'xSmall',
        width: 'stretch',
        marginInlineStart: '-px',
        marginBlockStart: '-px',
        whiteSpace: 'nowrap',
        '& td, & th': {
          paddingInline: 'medium',
          paddingBlock: 'small',
          borderInlineStart: '1px solid token(colors.figma.border)',
          borderBlock: '1px solid token(colors.figma.border)',
          textAlign: 'left',
        },
        '& th': {
          fontWeight: 'bold',
        },
      })}
    >
      <tbody>
        <tr>
          <th>Name</th>
          {collection.modes.map((mode, i) => {
            return (
              <th
                key={mode.modeId}
                style={
                  i === collection.modes.length - 1 ? { width: '100%' } : {}
                }
              >
                {mode.name}
              </th>
            );
          })}
        </tr>
        {(groupName
          ? [['', groups.get(groupName)!] as const]
          : Array.from(groups.entries())
        ).map(([groupName, variables]) => {
          return (
            <Fragment key={groupName}>
              {groupName && (
                <tr>
                  <th colSpan={collection.modes.length + 1}>
                    <div
                      className={css({
                        paddingBlockStart: 'large',
                      })}
                    >
                      {groupName}
                    </div>
                  </th>
                </tr>
              )}
              {variables.map(([variable, resolvedValuesByMode]) => {
                return (
                  <tr key={variable.id}>
                    <td>{variable.name}</td>
                    {collection.modes.map((mode) => {
                      const [resolvedValue, resolvedVariable] =
                        resolvedValuesByMode[mode.modeId];

                      let element;

                      if (
                        typeof resolvedValue === 'string' ||
                        typeof resolvedValue === 'number'
                      ) {
                        element = String(resolvedValue);
                      } else if (typeof resolvedValue === 'boolean') {
                        element = JSON.stringify(resolvedValue);
                      } else {
                        const result = rgbaSchema
                          .or(rgbaSchema)
                          .safeParse(resolvedValue);

                        if (result.success) {
                          const hex = rgbToHex(result.data);

                          element = (
                            <div
                              className={css({
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'small',
                              })}
                            >
                              <div
                                className={css({
                                  width: 'large',
                                  height: 'large',
                                  borderRadius: 'xxSmall',
                                })}
                                style={{
                                  backgroundColor: hex,
                                }}
                              />
                              {resolvedVariable === variable ? (
                                <div>{hex}</div>
                              ) : (
                                <div
                                  className={css({
                                    paddingInline: 'xSmall',
                                    marginBlock: '-px',
                                    borderRadius: 'xSmall',
                                    border:
                                      '1px solid token(colors.figma.border)',
                                    backgroundColor: 'figma.bg.secondary',
                                  })}
                                >
                                  {resolvedVariable.name}
                                </div>
                              )}
                            </div>
                          );
                        } else {
                          element = 'unknown';
                        }
                      }

                      return <td key={mode.modeId}>{element}</td>;
                    })}
                  </tr>
                );
              })}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export const Root = () => {
  const runtime = useRuntime();

  const collections = useSelector((state: RootState) => {
    return variableCollectionsSelectors.selectAll(state.variableCollections);
  });

  const [expandedCollections, setExpandedCollections] = useState<string[]>();
  const [selection, setSelection] = useState<string[]>();

  let collectionGrid;

  if (collections.length > 0) {
    let collection;
    let currentSelection;

    if (selection) {
      collection = collections.find((collection) => {
        return collection.id === selection[0];
      });
      currentSelection = selection;
    } else {
      collection = collections[0];
      currentSelection = [collection.id];
    }

    if (collection) {
      collectionGrid = (
        <CollectionGrid collection={collection} selection={currentSelection} />
      );
    }
  }

  return (
    <>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'token(sizes.sidebar) 1fr',
          gridTemplateRows: '1fr auto',
        })}
      >
        <ScrollArea
          className={css({
            borderInlineEnd: '1px solid token(colors.figma.border)',
            borderBlockEnd: '1px solid token(colors.figma.border)',
            '& > [data-radix-scroll-area-viewport]': {
              position: 'absolute',
              inset: 0,
            },
          })}
        >
          <div>
            <SidebarAccordionRoot
              type="multiple"
              value={
                expandedCollections ?? collections.slice(0, 1).map((c) => c.id)
              }
              onValueChange={(value) => {
                setExpandedCollections(value);
              }}
            >
              {collections.map((collection) => {
                return (
                  <CollectionAccordion
                    key={collection.id}
                    collection={collection}
                    selection={
                      selection ?? collections.slice(0, 1).map((c) => c.id)
                    }
                    setSelection={setSelection}
                  />
                );
              })}
            </SidebarAccordionRoot>
          </div>
        </ScrollArea>
        <ScrollArea
          className={css({
            gridRow: 'auto / span 2',
            '& > [data-radix-scroll-area-viewport]': {
              position: 'absolute',
              inset: 0,
            },
          })}
        >
          {collectionGrid}
        </ScrollArea>
        <div
          className={css({
            borderInlineEnd: '1px solid token(colors.figma.border)',
            padding: 'small',
          })}
        >
          <button
            className={css({
              textStyle: 'xSmall',
              padding: 'small',
              borderRadius: 'xSmall',
              _hover: {
                backgroundColor: 'figma.bg.hover',
              },
              _active: {
                backgroundColor: 'figma.bg.pressed',
              },
            })}
            onClick={() => {
              runtime.copyTokens();
            }}
          >
            Copy all variables
          </button>
        </div>
      </div>
      <ResizeHandle />
    </>
  );
};
