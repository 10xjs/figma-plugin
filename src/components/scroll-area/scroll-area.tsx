import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import { forwardRef } from 'react';
import {
  scrollAreaScrollBar,
  scrollAreaThumb,
  scrollAreaViewport,
} from 'styled-system/recipes';

const ScrollBar = (props: { orientation: 'vertical' | 'horizontal' }) => {
  const { orientation } = props;
  return (
    <RadixScrollArea.Scrollbar
      className={scrollAreaScrollBar()}
      orientation={orientation}
    >
      <RadixScrollArea.Thumb className={scrollAreaThumb()} />
    </RadixScrollArea.Scrollbar>
  );
};

export type ScrollAreaProps = RadixScrollArea.ScrollAreaProps;
export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  function ScrollArea(props, ref) {
    const { children, ...rest } = props;

    return (
      <RadixScrollArea.Root ref={ref} {...rest} scrollHideDelay={2000}>
        <RadixScrollArea.Viewport className={scrollAreaViewport()}>
          {children}
        </RadixScrollArea.Viewport>
        <ScrollBar orientation="horizontal" />
        <ScrollBar orientation="vertical" />
        <RadixScrollArea.Corner />
      </RadixScrollArea.Root>
    );
  }
);
