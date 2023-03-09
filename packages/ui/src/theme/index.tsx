import { useMemo } from 'react';
import { ThemeProvider as Provider, ThemeProviderProps, Global, css } from '@emotion/react';

import { createTheme } from './createTheme';

export * from './types';

const GlobalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Lexend&display=swap');
  * {
    font-family: 'Lexend', sans-serif;
  }
`;

export const ThemeProvider = ({ children, ...props }: Omit<ThemeProviderProps, 'theme'>) => {
  const theme = useMemo(() => createTheme(), []);

  return (
    <Provider theme={theme} {...props}>
      <Global styles={{ ...theme.global, GlobalStyles }} />

      {children}
    </Provider>
  );
};
