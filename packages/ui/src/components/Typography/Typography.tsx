import styled from '@emotion/styled';

import { TextColor, TypographyVariant } from '../../theme';

type TypographyProps = {
  color?: TextColor;
  variant?: TypographyVariant;
  align?: 'left' | 'center';
  inline?: boolean;
};

export const Typography = styled.div<TypographyProps>(
  ({ theme, variant = 'body1', color = 'primary', align = 'left', inline = false }) => ({
    lineHeight: 1.5,
    ...theme.typography[variant],
    color: theme.palette.text[color],
    fontFamily: theme.typography.fontFamily,

    display: inline ? 'inline-block' : 'block',
    textAlign: align,
  }),
);
