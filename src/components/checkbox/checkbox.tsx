import * as Icon from '@phosphor-icons/react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { css } from 'styled-system/css';

export type CheckboxProps = ComponentPropsWithoutRef<
  typeof RadixCheckbox.Root
> & {
  indeterminate?: boolean | undefined;
};

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  function Checkbox(props, forwardedRef) {
    const { className, indeterminate, ...rest } = props;

    const classNames = [
      css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'medium',
        height: 'medium',
        borderRadius: 'xSmall',
        '&[data-state="unchecked"]': {
          boxShadow: 'inset 0 0 0 1px token(colors.figma.border.strong)',
        },
        backgroundColor: 'figma.bg',
        '&:hover': {
          backgroundColor: 'figma.bg.hover',
        },
      }),
    ];

    if (className) {
      classNames.push(className);
    }

    const CurrentIcon = indeterminate ? Icon.Minus : Icon.Check;

    return (
      <RadixCheckbox.Root
        ref={forwardedRef}
        {...rest}
        className={classNames.join(' ')}
      >
        <RadixCheckbox.Indicator
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'figma.bg.brand',
            borderRadius: 'xSmall',
            padding: 'xxSmall',
            width: 'stretch',
            height: 'stretch',
          })}
        >
          <CurrentIcon
            weight="bold"
            className={css({
              width: 'medium',
              height: 'medium',
              color: 'figma.icon.onbrand',
            })}
          />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
    );
  }
);
