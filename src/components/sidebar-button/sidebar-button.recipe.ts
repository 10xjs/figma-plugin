import { defineRecipe } from '@pandacss/dev';

export const sidebarButtonRecipe = defineRecipe({
  name: 'sidebarButton',
  base: {
    display: 'flex',
    width: 'stretch',
    textStyle: 'xSmall',
    paddingInlineStart: 'xLarge',
    paddingBlock: 'small',
    paddingInlineEnd: 'small',
    '&[data-state=inactive]:hover': {
      backgroundColor: 'figma.bg.hover',
    },
    '&[data-state=inactive]:active': {
      backgroundColor: 'figma.bg.pressed',
    },
    '&[data-state=active]': {
      backgroundColor: 'figma.bg.selected',
    },
    '&[data-state=active]:hover': {
      backgroundColor: 'figma.bg.selected.hover',
    },
    '&[data-state=active]:active': {
      backgroundColor: 'figma.bg.selected.pressed',
    },
  },
});

export const sidebarButtonEndContentRecipe = defineRecipe({
  name: 'sidebarButtonEndContent',
  base: {
    marginInlineStart: 'auto',
    color: 'figma.text.tertiary',
  },
});
