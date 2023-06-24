import { Notches } from '@phosphor-icons/react';
import { useRef } from 'react';
import { css } from 'styled-system/css';

import { useRuntime } from '~/runtime';

export type ResizeHandleProps = {
  maxWidth?: number;
  maxHeight?: number;
  minWidth?: number;
  minHeight?: number;
};
export const ResizeHandle = (props: ResizeHandleProps) => {
  const runtime = useRuntime();

  const {
    maxWidth = Infinity,
    maxHeight = Infinity,
    minWidth = 100,
    minHeight = 100,
  } = props;

  const pointerDownPosition = useRef<{ x: number; y: number }>();

  return (
    <Notches
      aria-hidden
      size={16}
      className={css({
        position: 'fixed',
        bottom: '0',
        right: '0',
        cursor: 'se-resize',
        color: 'figma.icon.tertiary',
        '&:hover': {
          color: 'figma.icon.tertiary.hover',
        },
      })}
      onPointerDown={(event) => {
        pointerDownPosition.current = {
          x: event.nativeEvent.offsetX,
          y: event.nativeEvent.offsetY,
        };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerUp={(event) => {
        pointerDownPosition.current = undefined;
        event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!pointerDownPosition.current) {
          return;
        }

        const width = Math.round(
          Math.max(
            minWidth,
            Math.min(
              maxWidth,
              event.clientX + 16 - pointerDownPosition.current.x
            )
          )
        );

        const height = Math.round(
          Math.max(
            minHeight,
            Math.min(
              maxHeight,
              event.clientY + 16 - pointerDownPosition.current.y
            )
          )
        );

        runtime.resize({ width, height });
      }}
    />
  );
};
