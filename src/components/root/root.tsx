import * as ScrollArea from '@radix-ui/react-scroll-area';
import { useSelector } from 'react-redux';
import { css } from 'styled-system/css';

import { variableCollectionsSelectors } from '~/features/variable-collections/variable-collections.slice';
import { RootState } from '~/store';

import { ResizeHandle } from '../resize-handle';

export const Root = () => {
  const collections = useSelector((state: RootState) => {
    return variableCollectionsSelectors.selectAll(state.variableCollections);
  });

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
          })}
        >
          <ScrollArea.Viewport
            className={css({
              position: 'absolute',
              inset: 0,
            })}
          >
            <div
              className={css({
                padding: 'large',
              })}
            >
              {collections.map((collection) => {
                return <div key={collection.id}>{collection.name}</div>;
              })}
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
              _hover: {
                borderColor: 'figma.border',
                backgroundColor: 'scrollBar.track.hover',
              },
              _vertical: {
                borderLeftWidth: '1px',
                borderLeftStyle: 'solid',
                width: 'scrollbar',
              },
              _horizontal: {
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
            padding: 'large',
          })}
        >
          Content
        </div>
      </div>
      <ResizeHandle />
    </>
  );
};
