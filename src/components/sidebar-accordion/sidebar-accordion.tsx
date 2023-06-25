import * as Icon from '@phosphor-icons/react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import {
  sidebarAccordionContent,
  sidebarAccordionHeader,
  sidebarAccordionIcon,
  sidebarAccordionItem,
  sidebarAccordionLabel,
  sidebarAccordionTrigger,
} from 'styled-system/recipes';

export type SidebarAccordionRootProps = ComponentPropsWithoutRef<
  typeof RadixAccordion.Root
>;

export const SidebarAccordionRoot = RadixAccordion.Root;

type SidebarAccordionProps = ComponentPropsWithoutRef<
  typeof RadixAccordion.Item
> & {
  label?: ReactNode;
};

export const SidebarAccordion = forwardRef<
  HTMLDivElement,
  SidebarAccordionProps
>(function SidebarAccordion(props, ref) {
  const { className, children, label, ...rest } = props;

  let itemClassName = sidebarAccordionItem();

  if (className) {
    itemClassName += ` ${className}`;
  }

  return (
    <RadixAccordion.Item ref={ref} className={itemClassName} {...rest}>
      <RadixAccordion.Header className={sidebarAccordionHeader()}>
        <RadixAccordion.Trigger asChild>
          <div role="button" tabIndex={0} className={sidebarAccordionTrigger()}>
            <Icon.CaretDown
              weight="fill"
              className={sidebarAccordionIcon()}
              aria-hidden
            />
            <div className={sidebarAccordionLabel()}>{label}</div>
          </div>
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
      <RadixAccordion.Content className={sidebarAccordionContent()}>
        {children}
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
});
