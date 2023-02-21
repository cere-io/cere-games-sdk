import styled from '@emotion/styled';

import { Spacing } from '../../theme';

type StackProps = {
  spacing?: number;
  direction?: 'column' | 'row';
  align?: 'start' | 'center' | 'end' | 'stretch';
  padding?: Spacing;
};

export const Stack = styled.div<StackProps>(
  ({ theme, padding, spacing = 0, direction = 'column', align = 'center' }) => ({
    display: 'flex',
    flexDirection: direction,
    alignItems: align,
    padding: padding && theme.spacing(...padding),

    '> :not(:last-child)': {
      [direction === 'column' ? 'marginBottom' : 'marginRight']: theme.spacing(spacing),
    },
  }),
);
