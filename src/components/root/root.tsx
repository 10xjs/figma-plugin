import * as Icon from '@phosphor-icons/react';
import * as Accordion from '@radix-ui/react-accordion';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { createSelector } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { css } from 'styled-system/css';

import { variableCollectionsSelectors } from '~/features/variable-collections/variable-collections.slice';
import { variablesSelectors } from '~/features/variables/variables.slice';
import { Variable, VariableCollection } from '~/schema';
import { RootState } from '~/store';

import { Checkbox } from '../checkbox';
import { ResizeHandle } from '../resize-handle';

const selectVariables = createSelector(
  [(state: RootState) => state.variables, (state, ids: string[]) => ids],
  (variables, ids) => {
    return ids.map((id) => {
      return variablesSelectors.selectById(variables, id);
    });
  }
);

const Collection = (props: { collection: VariableCollection }) => {
  const { collection } = props;

  const variables = useSelector(
    useMemo(
      () => (state: RootState) =>
        selectVariables(state, collection.variableIds),
      [collection.variableIds]
    )
  );

  const groups = useMemo(() => {
    const groups = new Map<string, Variable[]>();

    for (const variable of variables) {
      const parts = variable.name.split('/');
      if (parts.length > 1) {
        const groupName = parts[0];
        const group = groups.get(groupName);
        if (group) {
          group.push(variable);
        } else {
          groups.set(groupName, [variable]);
        }
      }
    }

    return groups;
  }, [variables]);

  return (
    <Accordion.Item
      className={css({
        overflow: 'hidden',
        marginTop: 'px',
      })}
      value={collection.id}
    >
      <Accordion.Header
        className={css({
          display: 'flex',
          borderBlockEnd: '1px solid token(colors.figma.border)',
        })}
      >
        <Accordion.Trigger asChild>
          <div
            role="button"
            tabIndex={0}
            className={css({
              display: 'flex',
              gap: 'small',
              alignItems: 'center',
              padding: 'medium',
              flex: 1,
              color: 'figma.icon.tertiary',
              '&:hover': {
                color: 'figma.icon.tertiary.hover',
                backgroundColor: 'figma.bg.hover',
              },
            })}
          >
            <Icon.CaretDown
              weight="fill"
              className={css({
                width: 'small',
                height: 'small',
                transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                '[data-state=closed] &': {
                  transform: 'rotate(-90deg)',
                },
                '[data-state=open] &': {
                  transform: 'rotate(0deg)',
                },
              })}
              aria-hidden
            />
            <div
              className={css({
                color: 'figma.text',
                textStyle: 'xSmall',
                marginInlineEnd: 'auto',
                fontWeight: '600',
                userSelect: 'none',
              })}
            >
              {collection.name}
            </div>
            <Checkbox
              indeterminate
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
          </div>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content
        className={css({
          '&[data-state=open]': {
            animation: 'accordion.slideDown',
          },
          '&[data-state=closed]': {
            animation: 'accordion.slideUp',
          },
          paddingInlineStart: 'xxLarge',
          borderBlockEnd: '1px solid token(colors.figma.border)',
        })}
      >
        <div
          className={css({
            textStyle: 'xSmall',
          })}
        >
          All variables
        </div>

        {Array.from(groups.entries()).map(([groupName, variables]) => {
          return (
            <div
              key={groupName}
              className={css({
                textStyle: 'xSmall',
              })}
            >
              {groupName}
            </div>
          );
        })}
      </Accordion.Content>
    </Accordion.Item>
  );
};

export const Root = () => {
  const collections = useSelector((state: RootState) => {
    return variableCollectionsSelectors.selectAll(state.variableCollections);
  });

  console.log(collections);

  return (
    <>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'token(sizes.sidebar) 1fr',
        })}
      >
        <ScrollArea.Root
          className={css({
            borderRight: '1px solid token(colors.figma.border)',
            backgroundColor: 'figma.bg.secondary',
          })}
        >
          <ScrollArea.Viewport
            className={css({
              position: 'absolute',
              inset: 0,
            })}
          >
            <div>
              <Accordion.Root type="multiple">
                {collections.map((collection) => {
                  return (
                    <Collection key={collection.id} collection={collection} />
                  );
                })}
              </Accordion.Root>
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className={css({
              display: 'flex',
              userSelect: 'none',
              touchAction: 'none',
              padding: 'xxSmall',
              backgroundColor: 'figma.bg',
              transition:
                'background-color 160ms ease-out, border-color 160ms ease-out',
              borderColor: 'transparent',
              '&:hover': {
                borderColor: 'figma.border',
                backgroundColor: 'scrollBar.track.hover',
              },
              '&[data-orientation=vertical]': {
                borderLeftWidth: '1px',
                borderLeftStyle: 'solid',
                width: 'scrollbar',
              },
              '&[data-orientation=horizontal]': {
                borderTopWidth: '1px',
                borderTopStyle: 'solid',
                flexDirection: 'column',
                height: 'scrollbar',
              },
            })}
            orientation="vertical"
          >
            <ScrollArea.Thumb
              className={css({
                flex: 1,
                borderRadius: 'full',
                backgroundColor: 'scrollBar.thumb',
                position: 'relative',
              })}
            />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>

        <div
          className={css({
            padding: 'small',
          })}
        >
          Content
        </div>
      </div>
      <ResizeHandle />
    </>
  );
};
