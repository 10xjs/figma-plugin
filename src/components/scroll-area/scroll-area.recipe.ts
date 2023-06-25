import { defineRecipe } from '@pandacss/dev';

export const scrollAreaScrollBarRecipe = defineRecipe({
  name: 'scrollAreaScrollBar',
  base: {
    display: 'flex',
    userSelect: 'none',
    touchAction: 'none',
    padding: 'xxSmall',
    transition: 'background-color 160ms ease-out, border-color 160ms ease-out',
    borderColor: 'transparent',
    '&:hover': {
      borderColor: 'figma.border',
      backgroundColor: 'scrollBar.track.hover',
    },
    '&:active': {
      backgroundColor: 'scrollBar.track.drag',
    },
    '&[data-orientation=vertical]': {
      borderLeftWidth: '1px',
      borderLeftStyle: 'solid',
      width: 'scrollbar',
    },
    '&[data-orientation=horizontal]': {
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      flexDirection: 'column',
      height: 'scrollbar',
    },
  },
});

export const scrollAreaThumbRecipe = defineRecipe({
  name: 'scrollAreaThumb',
  base: {
    flex: 1,
    borderRadius: 'full',
    backgroundColor: 'scrollBar.thumb',
    position: 'relative',
  },
});

export const scrollAreaViewportRecipe = defineRecipe({
  name: 'scrollAreaViewport',
  base: {
    width: '100%',
    height: '100%',
  },
});
