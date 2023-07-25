import styled from '@emotion/styled';
import { useMemo } from 'react';

import { Truncate } from '../Truncate';
import { Typography } from '../Typography';
import { Rank, RankProps } from './Rank';
import { TableRow } from './TableRow';
import { CurrentPlayerIconWhite, TrophyWhiteIcon } from '../../icons';
import { useConfigContext, useMediaQuery } from '../../hooks';

type Data = {
  rank: number;
  address: string;
  score: number;
};

export type TableDataRowProps = {
  active?: boolean;
  data: Data;
  hasReward?: boolean;
};

const Wrapper = styled.div<Pick<TableDataRowProps, 'active'>>(({ theme, active = false }) => ({
  backgroundColor: 'rgba(233, 204, 255, 0.05)',
  borderRadius: theme.borderRadius(2),
  marginBottom: 1,

  ...(active && {
    borderRadius: theme.borderRadius(2),
    background: 'rgba(133, 70, 183, 0.50)',
    marginBottom: 1,
  }),
}));

const CurrentPlayer = styled.div({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: 'auto 20px',
  columnGap: 8,
});

const rankColors: RankProps['rankColor'][] = ['gold', 'silver', 'bronze'];

export const TableDataRow = ({ data, active, hasReward }: TableDataRowProps) => {
  const { staticAssets } = useConfigContext();
  const isMobile = useMediaQuery('(max-width: 600px)');

  const rewardTsx = useMemo(() => {
    if (!hasReward) {
      return <div style={{ width: '20px', height: '20px' }}>{null}</div>;
    }
    // return <Prize src={staticAssets.mysteryBox} />; // TODO ask if image come from backend
    return <TrophyWhiteIcon />;
  }, [hasReward, staticAssets]);

  return (
    <Wrapper active={active} role="row" aria-selected={active}>
      <TableRow
        columns={[
          <Rank rankColor={rankColors[data.rank - 1]}>{data.rank}</Rank>,
          <Typography variant="body2">
            <CurrentPlayer>
              <Truncate aria-label="Address" variant="hex" maxLength={8} text={data.address} />
              {active && !isMobile && <CurrentPlayerIconWhite />}
            </CurrentPlayer>
          </Typography>,
          rewardTsx,
          <Typography variant="body2" fontWight="bold">
            {data.score}
          </Typography>,
        ]}
      />
    </Wrapper>
  );
};
