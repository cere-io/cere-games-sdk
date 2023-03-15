import { Theme } from '@emotion/react';

import toShorthand from './toShorthand';

export const createTheme = (): Theme => ({
  spacing: toShorthand(8),
  borderRadius: toShorthand(4),

  global: {
    ':host': {},
    '*': {
      boxSizing: 'border-box',
    },
  },

  palette: {
    text: {
      primary: '#FFFFFF',
      secondary: '#9A9A9A',
      caption: '#CCCCCC',
      'text-primary': '#131B32',
    },

    border: 'rgba(255, 255, 255, 0.3)',
  },

  typography: {
    fontFamily: 'Lexend, sans-serif',

    fontWeight: {
      bold: 700,
      'semi-bold': 600,
      medium: 500,
      regular: 400,
    },

    body1: {
      fontSize: 16,
    },

    body2: {
      fontSize: 14,
    },

    caption: {
      fontSize: 12,
      lineHeight: 1.2,
    },

    h1: {
      fontSize: 32,
      fontWeight: 700,

      '@media (max-width: 600px)': {
        fontSize: 24,
      },
    },

    h2: {
      fontSize: 28,
      fontWeight: 600,

      '@media (max-width: 600px)': {
        fontSize: 24,
      },
    },

    button: {
      fontWeight: 600,
      fontSize: 20,

      '@media (max-width: 600px)': {
        fontSize: 16,
      },
    },
  },
});
