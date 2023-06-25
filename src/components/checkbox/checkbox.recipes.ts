import { defineRecipe } from '@pandacss/dev';

export const checkboxRecipe = defineRecipe({
  name: 'checkbox',
  base: {
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
  },
});

export const checkboxIndiciatorRecipe = defineRecipe({
  name: 'checkboxIndiciator',
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'figma.bg.brand',
    borderRadius: 'xSmall',
    padding: 'xxSmall',
    width: 'stretch',
    height: 'stretch',
  },
});

export const checkboxIconRecipe = defineRecipe({
  name: 'checkboxIcon',
  base: {
    width: 'medium',
    height: 'medium',
    color: 'figma.icon.onbrand',
  },
});
