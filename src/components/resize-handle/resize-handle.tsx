import { Notches } from '@phosphor-icons/react';
import { useRef } from 'react';
import { resizeHandle } from 'styled-system/recipes';

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
      className={resizeHandle()}
      onPointerDown={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();

        pointerDownPosition.current = {
          x: event.nativeEvent.offsetX - rect.width,
          y: event.nativeEvent.offsetY - rect.height,
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
            Math.min(maxWidth, event.clientX - pointerDownPosition.current.x)
          )
        );

        const height = Math.round(
          Math.max(
            minHeight,
            Math.min(maxHeight, event.clientY - pointerDownPosition.current.y)
          )
        );

        runtime.resize({ width, height });
      }}
    />
  );
};
