import { defineConfig, defineGlobalStyles } from '@pandacss/dev';
import { Tokens } from '@pandacss/types';

import {
  checkboxIconRecipe,
  checkboxIndiciatorRecipe,
  checkboxRecipe,
} from '~/components/checkbox/checkbox.recipes';
import { resizeHandleRecipe } from '~/components/resize-handle/resize-handle.recipe';
import {
  scrollAreaScrollBarRecipe,
  scrollAreaThumbRecipe,
  scrollAreaViewportRecipe,
} from '~/components/scroll-area/scroll-area.recipe';
import {
  sidebarAccordionContentRecipe,
  sidebarAccordionHeaderRecipe,
  sidebarAccordionIconRecipe,
  sidebarAccordionItemRecipe,
  sidebarAccordionLabelRecipe,
  sidebarAccordionTriggerRecipe,
} from '~/components/sidebar-accordion/sidebar-accordion.recipe';
import {
  sidebarButtonEndContentRecipe,
  sidebarButtonRecipe,
} from '~/components/sidebar-button/sidebar-button.recipe';

const recipes = {
  checkbox: checkboxRecipe,
  checkboxIcon: checkboxIconRecipe,
  checkboxIndiciator: checkboxIndiciatorRecipe,
  resizeHandle: resizeHandleRecipe,
  scrollAreaScrollBar: scrollAreaScrollBarRecipe,
  scrollAreaThumb: scrollAreaThumbRecipe,
  scrollAreaViewport: scrollAreaViewportRecipe,
  sidebarAccordionContent: sidebarAccordionContentRecipe,
  sidebarAccordionHeader: sidebarAccordionHeaderRecipe,
  sidebarAccordionIcon: sidebarAccordionIconRecipe,
  sidebarAccordionItem: sidebarAccordionItemRecipe,
  sidebarAccordionLabel: sidebarAccordionLabelRecipe,
  sidebarAccordionTrigger: sidebarAccordionTriggerRecipe,
  sidebarButton: sidebarButtonRecipe,
  sidebarButtonEndContent: sidebarButtonEndContentRecipe,
};

const figmaColors = [
  '--figma-color-bg',
  '--figma-color-bg-brand',
  '--figma-color-bg-brand-hover',
  '--figma-color-bg-brand-pressed',
  '--figma-color-bg-brand-secondary',
  '--figma-color-bg-brand-tertiary',
  '--figma-color-bg-component',
  '--figma-color-bg-component-hover',
  '--figma-color-bg-component-pressed',
  '--figma-color-bg-component-secondary',
  '--figma-color-bg-component-tertiary',
  '--figma-color-bg-danger',
  '--figma-color-bg-danger-hover',
  '--figma-color-bg-danger-pressed',
  '--figma-color-bg-danger-secondary',
  '--figma-color-bg-danger-tertiary',
  '--figma-color-bg-disabled',
  '--figma-color-bg-disabled-secondary',
  '--figma-color-bg-hover',
  '--figma-color-bg-inverse',
  '--figma-color-bg-onselected',
  '--figma-color-bg-onselected-hover',
  '--figma-color-bg-onselected-pressed',
  '--figma-color-bg-pressed',
  '--figma-color-bg-secondary',
  '--figma-color-bg-selected',
  '--figma-color-bg-selected-hover',
  '--figma-color-bg-selected-pressed',
  '--figma-color-bg-selected-secondary',
  '--figma-color-bg-selected-strong',
  '--figma-color-bg-selected-tertiary',
  '--figma-color-bg-success',
  '--figma-color-bg-success-hover',
  '--figma-color-bg-success-pressed',
  '--figma-color-bg-success-secondary',
  '--figma-color-bg-success-tertiary',
  '--figma-color-bg-tertiary',
  '--figma-color-bg-warning',
  '--figma-color-bg-warning-hover',
  '--figma-color-bg-warning-pressed',
  '--figma-color-bg-warning-secondary',
  '--figma-color-bg-warning-tertiary',
  '--figma-color-border',
  '--figma-color-border-brand',
  '--figma-color-border-brand-strong',
  '--figma-color-border-component',
  '--figma-color-border-component-hover',
  '--figma-color-border-component-strong',
  '--figma-color-border-danger',
  '--figma-color-border-danger-strong',
  '--figma-color-border-disabled',
  '--figma-color-border-disabled-strong',
  '--figma-color-border-onbrand',
  '--figma-color-border-onbrand-strong',
  '--figma-color-border-oncomponent',
  '--figma-color-border-oncomponent-strong',
  '--figma-color-border-ondanger',
  '--figma-color-border-ondanger-strong',
  '--figma-color-border-onselected',
  '--figma-color-border-onselected-strong',
  '--figma-color-border-onsuccess',
  '--figma-color-border-onsuccess-strong',
  '--figma-color-border-onwarning',
  '--figma-color-border-onwarning-strong',
  '--figma-color-border-selected',
  '--figma-color-border-selected-strong',
  '--figma-color-border-strong',
  '--figma-color-border-success',
  '--figma-color-border-success-strong',
  '--figma-color-border-warning',
  '--figma-color-border-warning-strong',
  '--figma-color-icon',
  '--figma-color-icon-brand',
  '--figma-color-icon-brand-pressed',
  '--figma-color-icon-brand-secondary',
  '--figma-color-icon-brand-tertiary',
  '--figma-color-icon-component',
  '--figma-color-icon-component-pressed',
  '--figma-color-icon-component-secondary',
  '--figma-color-icon-component-tertiary',
  '--figma-color-icon-danger',
  '--figma-color-icon-danger-hover',
  '--figma-color-icon-danger-pressed',
  '--figma-color-icon-danger-secondary',
  '--figma-color-icon-danger-secondary-hover',
  '--figma-color-icon-danger-tertiary',
  '--figma-color-icon-disabled',
  '--figma-color-icon-hover',
  '--figma-color-icon-onbrand',
  '--figma-color-icon-onbrand-secondary',
  '--figma-color-icon-onbrand-tertiary',
  '--figma-color-icon-oncomponent',
  '--figma-color-icon-oncomponent-secondary',
  '--figma-color-icon-oncomponent-tertiary',
  '--figma-color-icon-ondanger',
  '--figma-color-icon-ondanger-secondary',
  '--figma-color-icon-ondanger-tertiary',
  '--figma-color-icon-ondisabled',
  '--figma-color-icon-oninverse',
  '--figma-color-icon-onselected',
  '--figma-color-icon-onselected-secondary',
  '--figma-color-icon-onselected-strong',
  '--figma-color-icon-onselected-tertiary',
  '--figma-color-icon-onsuccess',
  '--figma-color-icon-onsuccess-secondary',
  '--figma-color-icon-onsuccess-tertiary',
  '--figma-color-icon-onwarning',
  '--figma-color-icon-onwarning-secondary',
  '--figma-color-icon-onwarning-tertiary',
  '--figma-color-icon-pressed',
  '--figma-color-icon-secondary',
  '--figma-color-icon-secondary-hover',
  '--figma-color-icon-selected',
  '--figma-color-icon-selected-secondary',
  '--figma-color-icon-selected-tertiary',
  '--figma-color-icon-success',
  '--figma-color-icon-success-pressed',
  '--figma-color-icon-success-secondary',
  '--figma-color-icon-success-tertiary',
  '--figma-color-icon-tertiary',
  '--figma-color-icon-tertiary-hover',
  '--figma-color-icon-warning',
  '--figma-color-icon-warning-pressed',
  '--figma-color-icon-warning-secondary',
  '--figma-color-icon-warning-tertiary',
  '--figma-color-text',
  '--figma-color-text-brand',
  '--figma-color-text-brand-secondary',
  '--figma-color-text-brand-tertiary',
  '--figma-color-text-component',
  '--figma-color-text-component-pressed',
  '--figma-color-text-component-secondary',
  '--figma-color-text-component-tertiary',
  '--figma-color-text-danger',
  '--figma-color-text-danger-secondary',
  '--figma-color-text-danger-tertiary',
  '--figma-color-text-disabled',
  '--figma-color-text-hover',
  '--figma-color-text-onbrand',
  '--figma-color-text-onbrand-secondary',
  '--figma-color-text-onbrand-tertiary',
  '--figma-color-text-oncomponent',
  '--figma-color-text-oncomponent-secondary',
  '--figma-color-text-oncomponent-tertiary',
  '--figma-color-text-ondanger',
  '--figma-color-text-ondanger-secondary',
  '--figma-color-text-ondanger-tertiary',
  '--figma-color-text-ondisabled',
  '--figma-color-text-oninverse',
  '--figma-color-text-onselected',
  '--figma-color-text-onselected-secondary',
  '--figma-color-text-onselected-strong',
  '--figma-color-text-onselected-tertiary',
  '--figma-color-text-onsuccess',
  '--figma-color-text-onsuccess-secondary',
  '--figma-color-text-onsuccess-tertiary',
  '--figma-color-text-onwarning',
  '--figma-color-text-onwarning-secondary',
  '--figma-color-text-onwarning-tertiary',
  '--figma-color-text-secondary',
  '--figma-color-text-secondary-hover',
  '--figma-color-text-selected',
  '--figma-color-text-selected-secondary',
  '--figma-color-text-selected-tertiary',
  '--figma-color-text-success',
  '--figma-color-text-success-secondary',
  '--figma-color-text-success-tertiary',
  '--figma-color-text-tertiary',
  '--figma-color-text-tertiary-hover',
  '--figma-color-text-warning',
  '--figma-color-text-warning-secondary',
  '--figma-color-text-warning-tertiary',
];

function generateColorTokens(
  colorsArray: string[]
): NonNullable<Tokens['colors']> {
  const tokens: NonNullable<Tokens['colors']> = {};

  for (const color of colorsArray) {
    const colorParts = color.replace(/^--figma-color-/, '').split('-');

    let currentLevel: NonNullable<Tokens['colors']> = tokens;

    for (const part of colorParts) {
      if (!currentLevel.hasOwnProperty(part)) {
        currentLevel[part] = {};
      }

      currentLevel = currentLevel[part] as NonNullable<Tokens['colors']>;
    }

    Object.assign(currentLevel, {
      DEFAULT: { value: `var(${color})`, type: 'color' },
    });
  }

  return tokens;
}

const figmaColorTokens = generateColorTokens(figmaColors);

const baseSizes = {
  0: { value: '0' },
  px: { value: '1px' },
  xxSmall: { value: '2px' },
  xSmall: { value: '4px' },
  small: { value: '8px' },
  medium: { value: '12px' },
  large: { value: '16px' },
  xLarge: { value: '24px' },
  xxLarge: { value: '32px' },
  xxxLarge: { value: '48px' },
  xxxxLarge: { value: '64px' },
};

const textSizes = {
  xSmall: { font: '12px', line: '16px' },
  small: { font: '14px', line: '20px' },
  base: { font: '16px', line: '24px' },
  medium: { font: '20px', line: '28px' },
  large: { font: '24px', line: '32px' },
  xLarge: { font: '32px', line: '40px' },
};

const config = defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  minify: true,

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    tokens: {
      fontSizes: Object.fromEntries(
        Object.entries(textSizes).map(([key, value]) => {
          return [key, { value: value.font, type: 'fontSize' }];
        })
      ),
      lineHeights: Object.fromEntries(
        Object.entries(textSizes).map(([key, value]) => {
          return [key, { value: value.line, type: 'lineHeight' }];
        })
      ),
      spacing: {
        ...baseSizes,
      },
      sizes: {
        ...baseSizes,
        sidebar: { value: '240px' },
        scrollbar: { value: '10px' },
      },
      radii: {
        ...baseSizes,
        full: { value: '9999px' },
      },
      shadows: {
        default: {
          value:
            '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
        contextMenu: {
          value:
            'var(--shadow-context-menu, 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2))',
        },
      },
      animations: {
        accordion: {
          slideDown: {
            value: 'accordionSlideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
          },
          slideUp: {
            value: 'accordionSlideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
          },
        },
      },
    },
    semanticTokens: {
      colors: {
        figma: figmaColorTokens,
        scrollBar: {
          thumb: {
            value: {
              _light: 'rgba(179, 179, 179, .5)',
              _dark: 'rgba(179, 179, 179, .5)',
            },
            type: 'color',
          },
          track: {
            hover: {
              value: {
                _light: 'rgba(245, 245, 245, .5)',
                _dark: 'rgba(56, 56, 56, 0.5)',
              },
              type: 'color',
            },
            drag: {
              value: {
                _light: 'rgba(255, 255, 255, .5)',
                _dark: 'rgba(44, 44, 44, 0.5)',
              },
              type: 'color',
            },
          },
        },
      },
    },
    textStyles: Object.fromEntries(
      Object.keys(textSizes).map((key) => {
        return [
          key,
          {
            value: {
              fontSize: `token(fontSizes.${key})`,
              lineHeight: `token(lineHeights.${key})`,
            },
          },
        ];
      })
    ),
    keyframes: {
      accordionSlideDown: {
        from: { height: 0 },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      accordionSlideUp: {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: 0 },
      },
    },
    recipes: recipes as any,
  },

  globalCss: defineGlobalStyles({
    html: {
      bg: 'figma.bg',
      color: 'figma.text',
      textStyle: 'base',
      height: '100%',
      overflow: 'hidden',
    },
    'body,#root': {
      display: 'grid',
      height: '100%',
      gridTemplateRows: '100%',
    },
    "button,[type='button'],[type='reset'],[type='submit']": {
      color: 'inherit',
      font: 'inherit',
    },
  }),

  conditions: {
    light: '.figma-light &',
    dark: '.figma-dark &',
  },

  // The output directory for your css system
  outdir: 'styled-system',
  // hash: { className: true, cssVar: false },
});

export default config;
