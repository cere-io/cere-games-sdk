import styled from '@emotion/styled';
import { ComponentProps } from 'react';

import { Spacing } from '../../theme';

type Props = {
  spacing?: number;
  direction?: 'column' | 'row';
  align?: 'left' | 'center';
  padding?: Spacing;
};

export type StackProps = ComponentProps<typeof Stack>;

export const Stack = styled.div<Props>(({ theme, padding, spacing = 0, direction = 'column', align = 'center' }) => ({
  display: 'flex',
  flexDirection: direction,
  alignItems: align === 'center' ? 'center' : 'flex-start',
  padding: padding && theme.spacing(...padding),

  '> :not(:last-child)': {
    [direction === 'column' ? 'marginBottom' : 'marginRight']: theme.spacing(spacing),
  },
}));
