import * as Icon from '@phosphor-icons/react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import {
  checkbox,
  checkboxIcon,
  checkboxIndiciator,
} from 'styled-system/recipes';

export type CheckboxProps = ComponentPropsWithoutRef<
  typeof RadixCheckbox.Root
> & {
  indeterminate?: boolean | undefined;
};

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  function Checkbox(props, forwardedRef) {
    const { className, indeterminate, ...rest } = props;

    let classNames = checkbox();

    if (className) {
      classNames = `${classNames} ${className}`;
    }

    const CurrentIcon = indeterminate ? Icon.Minus : Icon.Check;

    return (
      <RadixCheckbox.Root ref={forwardedRef} {...rest} className={classNames}>
        <RadixCheckbox.Indicator className={checkboxIndiciator()}>
          <CurrentIcon weight="bold" className={checkboxIcon()} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
    );
  }
);
