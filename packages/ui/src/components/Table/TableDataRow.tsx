import styled from '@emotion/styled';

import { Truncate } from '../Truncate';
import { Typography } from '../Typography';
import { Rank, RankProps } from './Rank';
import { TableRow } from './TableRow';
import { CurrentPlayerIcon } from '../../icons';

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
  backgroundColor: 'rgba(233, 204, 255, 0.05)',
  borderRadius: theme.borderRadius(2),
  marginBottom: 1,

  ...(active && {
    borderRadius: theme.borderRadius(2),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 1,
  }),
}));

const CurrentPlayer = styled.div({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: 'auto 20px',
  columnGap: 8,
});

const Prize = styled.img({
  width: 26,
  height: 26,
});

const rankColors: RankProps['rankColor'][] = ['gold', 'silver', 'bronze'];

export const TableDataRow = ({ data, active }: TableDataRowProps) => (
  <Wrapper active={active}>
    <TableRow
      columns={[
        <Rank rankColor={rankColors[data.rank - 1]}>{data.rank}</Rank>,
        <Typography variant="body2">
          <CurrentPlayer>
            <Truncate variant="hex" maxLength={10} text={data.address} />
            {active && <CurrentPlayerIcon />}
          </CurrentPlayer>
        </Typography>,
        <Prize src="https://assets.cms.freeport.dev.cere.network/box_22e9d83042.png" />,
        <Typography variant="body2" fontWight="bold">
          {data.score}
        </Typography>,
      ]}
    />
  </Wrapper>
);
