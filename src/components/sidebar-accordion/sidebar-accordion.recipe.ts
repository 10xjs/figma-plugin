import { defineRecipe } from '@pandacss/dev';

export const sidebarAccordionItemRecipe = defineRecipe({
  name: 'sidebarAccordionItem',
  base: {
    overflow: 'hidden',
  },
});

export const sidebarAccordionHeaderRecipe = defineRecipe({
  name: 'sidebarAccordionHeader',
  base: {
    display: 'flex',
  },
});

export const sidebarAccordionTriggerRecipe = defineRecipe({
  name: 'sidebarAccordionTrigger',
  base: {
    display: 'flex',
    gap: 'small',
    alignItems: 'center',
    padding: 'small',
    flex: 1,
    color: 'figma.icon.tertiary',
    '&:hover': {
      color: 'figma.icon.tertiary.hover',
      backgroundColor: 'figma.bg.hover',
    },
  },
});

export const sidebarAccordionIconRecipe = defineRecipe({
  name: 'sidebarAccordionIcon',
  base: {
    width: 'small',
    height: 'small',
    transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
    '[data-state=closed] > &': {
      transform: 'rotate(-90deg)',
    },
    '[data-state=open] > &': {
      transform: 'rotate(0deg)',
    },
  },
});

export const sidebarAccordionLabelRecipe = defineRecipe({
  name: 'sidebarAccordionLabel',
  base: {
    color: 'figma.text',
    textStyle: 'xSmall',
    marginInlineEnd: 'auto',
    fontWeight: '700',
    userSelect: 'none',
  },
});

export const sidebarAccordionContentRecipe = defineRecipe({
  name: 'sidebarAccordionContent',
  base: {
    '&[data-state=open]': {
      animation: 'accordion.slideDown',
    },
    '&[data-state=closed]': {
      animation: 'accordion.slideUp',
    },
  },
});
