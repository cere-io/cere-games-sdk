import styled from '@emotion/styled';

import { TextColor, TypographyVariant, TypographyWeight } from '../../theme';

export type TypographyProps = {
  color?: TextColor;
  variant?: TypographyVariant;
  fontWight?: TypographyWeight;
  align?: 'left' | 'center';
  inline?: boolean;
  uppercase?: boolean;
};

export const Typography = styled.div<TypographyProps>(
  ({ theme, fontWight, variant = 'body1', color = 'primary', align = 'left', inline = false, uppercase = false }) => ({
    lineHeight: 1.5,
    ...theme.typography[variant],
    color: theme.palette.text[color],
    fontFamily: theme.typography.fontFamily,
    textTransform: uppercase ? 'uppercase' : 'none',
    display: inline ? 'inline-block' : 'block',
    textAlign: align,

    ...(fontWight && {
      fontWeight: theme.typography.fontWeight[fontWight],
    }),
  }),
);
