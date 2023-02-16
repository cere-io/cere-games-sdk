import { CSSObject } from '@emotion/react';

import { ToShorthand, Spacing } from './toShorthand';

export type TextColor = 'primary' | 'secondary' | 'caption';
export type TypographyVariant = 'body1' | 'body2' | 'h1' | 'h2' | 'button';
export type { Spacing };

declare module '@emotion/react' {
  export interface Theme {
    spacing: ToShorthand;
    borderRadius: ToShorthand;
    global: Record<string, CSSObject>;

    palette: {
      text: Record<TextColor, string>;
    };

    typography: Record<TypographyVariant, CSSObject> & {
      fontFamily: string;
    };
  }
}
