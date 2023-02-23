import styled from '@emotion/styled';

import { Typography } from '../Typography';
import { Rank, RankProps } from './Rank';
import { TableRow } from './TableRow';

type Data = {
  rank: number;
  address: string;
  score: number;
};

export type TableDataRowProps = {
  active?: boolean;
  data: Data;
};

const Wrapper = styled.div<Pick<TableDataRowProps, 'active'>>(({ theme, active = false }) => ({
  fontWeight: 700,
  backgroundColor: 'rgba(233, 204, 255, 0.05)',
  marginBottom: 1,

  ...(active && {
    borderRadius: theme.borderRadius(2),
    backgroundColor: 'rgba(233, 204, 255, 0.2)',
    marginBottom: theme.spacing(1),
  }),
}));

const rankColors: RankProps['rankColor'][] = ['gold', 'silver', 'bronze'];

export const TableDataRow = ({ data, active }: TableDataRowProps) => (
  <Wrapper active={active}>
    <TableRow
      columns={[
        <Rank rankColor={rankColors[data.rank - 1]}>{data.rank}</Rank>,
        <Typography variant="body2">{data.address}</Typography>,
        <Typography variant="body2" fontWight="bold">
          {data.score}
        </Typography>,
      ]}
    />
  </Wrapper>
);
