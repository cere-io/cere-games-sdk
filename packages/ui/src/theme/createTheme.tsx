import { css, Theme } from '@emotion/react';

import toShorthand from './toShorthand';

const GlobalStyles = css`
  @font-face {
    font-family: 'Lexend', sans-serif;
    src: url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;700&display=swap');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Bebas Neue', sans-serif;
    src: url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    font-weight: 400;
    font-style: normal;
  }
`;

export const createTheme = (): Theme => ({
  ...GlobalStyles,
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

    border: 'rgba(255, 255, 255, 0.3)',
  },

  typography: {
    fontFamily: '"Lexend","Bebas Neue",sans-serif',

    fontWeight: {
      bold: 700,
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
      fontWeight: 'bold',
      fontSize: 20,

      '@media (max-width: 600px)': {
        fontSize: 16,
      },
    },
  },
});
