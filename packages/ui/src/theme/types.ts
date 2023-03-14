import { CSSObject } from '@emotion/react';

import { ToShorthand, Spacing } from './toShorthand';

export type TextColor = 'primary' | 'secondary' | 'caption' | 'text-primary';
export type TypographyVariant = 'body1' | 'body2' | 'caption' | 'h1' | 'h2' | 'button';
export type TypographyWeight = 'regular' | 'medium' | 'semi-bold' | 'bold';

export type { Spacing };

declare module '@emotion/react' {
  export interface Theme {
    spacing: ToShorthand;
    borderRadius: ToShorthand;
    global: Record<string, CSSObject>;

    palette: {
      text: Record<TextColor, string>;
      border: string;
    };

    typography: Record<TypographyVariant, CSSObject> & {
      fontFamily: string;
      fontWeight: Record<TypographyWeight, number | string>;
    };
  }
}
