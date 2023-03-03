import styled from '@emotion/styled';

import { TextColor, TypographyVariant, TypographyWeight } from '../../theme';

export type TypographyProps = {
  color?: TextColor;
  variant?: TypographyVariant | 'inherit';
  fontWight?: TypographyWeight;
  align?: 'left' | 'center';
  inline?: boolean;
  uppercase?: boolean;
  noWrap?: boolean;
};

export const Typography = styled.div<TypographyProps>(
  ({
    theme,
    fontWight,
    variant = 'body1',
    color = 'primary',
    align = 'left',
    inline = false,
    uppercase = false,
    noWrap = false,
  }) => ({
    lineHeight: 1.5,
    ...(variant !== 'inherit' && theme.typography[variant]),
    color: theme.palette.text[color],
    fontFamily: theme.typography.fontFamily,
    display: inline ? 'inline-block' : 'block',
    textAlign: align,

    ...(noWrap && {
      whiteSpace: 'nowrap',
    }),

    ...(uppercase && {
      textTransform: uppercase ? 'uppercase' : 'none',
    }),

    ...(fontWight && {
      fontWeight: theme.typography.fontWeight[fontWight],
    }),
  }),
);
