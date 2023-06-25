import { defineRecipe } from '@pandacss/dev';

export const resizeHandleRecipe = defineRecipe({
  name: 'resizeHandle',
  base: {
    position: 'fixed',
    bottom: '0',
    right: '0',
    width: 'scrollbar',
    height: 'scrollbar',
    cursor: 'nwse-resize',
    color: 'figma.icon.tertiary',
    '&:hover': {
      color: 'figma.icon.tertiary.hover',
    },
  },
});
