import { Slot } from '@radix-ui/react-slot';
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import { sidebarButton, sidebarButtonEndContent } from 'styled-system/recipes';

export type SidebarButtonProps = ComponentPropsWithoutRef<'button'> & {
  endContent?: ReactNode;
  asChild?: boolean | undefined;
};

export const SidebarButton = forwardRef<HTMLButtonElement, SidebarButtonProps>(
  function SidebarButton(props, ref) {
    const { className, children, endContent, asChild, ...rest } = props;

    let buttonClassName = sidebarButton();

    if (className) {
      buttonClassName += ` ${className}`;
    }

    const Comp = asChild ? Slot : 'button';

    return (
      <Comp ref={ref} className={buttonClassName} {...rest}>
        <div>{children}</div>
        <div className={sidebarButtonEndContent()}>{endContent}</div>
      </Comp>
    );
  }
);
