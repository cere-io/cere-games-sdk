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
    },
  },

  typography: {
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',

    body1: {
      fontSize: 16,
    },

    body2: {
      fontSize: 14,
    },

    h1: {
      fontSize: 34,
    },

    h2: {
      fontSize: 28,
      fontWeight: 600,
    },

    button: {
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: 2.8,
    },
  },
});
