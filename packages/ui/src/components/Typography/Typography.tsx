import styled from '@emotion/styled';
import { ComponentProps } from 'react';

import { TextColor, TypographyVariant } from '../../theme';

type Props = {
  color?: TextColor;
  variant?: TypographyVariant;
  align?: 'left' | 'center';
};

export type TypographyProps = ComponentProps<typeof Typography>;

export const Typography = styled.div<Props>(({ theme, variant = 'body1', color = 'primary', align = 'left' }) => ({
  ...theme.typography[variant],
  textAlign: align,
  color: theme.palette.text[color],
  fontFamily: theme.typography.fontFamily,
}));
