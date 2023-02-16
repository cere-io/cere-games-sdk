import { useMemo } from 'react';
import { ThemeProvider as Provider, ThemeProviderProps, Global } from '@emotion/react';

import { createTheme } from './createTheme';

export * from './types';

export const ThemeProvider = ({ children, ...props }: Omit<ThemeProviderProps, 'theme'>) => {
  const theme = useMemo(() => createTheme(), []);

  return (
    <Provider theme={theme} {...props}>
      <Global styles={theme.global} />

      {children}
    </Provider>
  );
};
