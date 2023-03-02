import styled from '@emotion/styled';

import { Spacing } from '../../theme';

type StackProps = {
  spacing?: number | 'space-between';
  direction?: 'column' | 'column-reverse' | 'row';
  align?: 'start' | 'center' | 'end' | 'stretch';
  padding?: Spacing;
  margin?: Spacing;
  colGap?: number;
  rowGap?: number;
};

export const Stack = styled.div<StackProps>(
  ({ theme, padding, margin, spacing = 0, direction = 'column', align = 'center', colGap, rowGap }) => ({
    display: 'flex',
    flexDirection: direction,
    alignItems: align,
    padding: padding && theme.spacing(...padding),
    margin: margin && theme.spacing(...margin),
    columnGap: colGap,
    rowGap,

    ...(spacing === 'space-between'
      ? {
          justifyContent: 'space-between',
        }
      : {
          '> :not(:last-child)': {
            [direction === 'column' ? 'marginBottom' : 'marginRight']: theme.spacing(spacing),
          },
        }),
  }),
);
