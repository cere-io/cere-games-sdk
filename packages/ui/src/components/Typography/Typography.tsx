import styled from '@emotion/styled';

import { TextColor, TypographyVariant } from '../../theme';

type TypographyProps = {
  color?: TextColor;
  variant?: TypographyVariant;
  align?: 'left' | 'center';
};

export const Typography = styled.div<TypographyProps>(
  ({ theme, variant = 'body1', color = 'primary', align = 'left' }) => ({
    ...theme.typography[variant],
    textAlign: align,
    color: theme.palette.text[color],
    fontFamily: theme.typography.fontFamily,
  }),
);
