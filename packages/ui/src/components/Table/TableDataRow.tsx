import styled from '@emotion/styled';
import { useMemo } from 'react';

import { Truncate } from '../Truncate';
import { Typography } from '../Typography';
import { Rank, RankProps } from './Rank';
import { TableRow } from './TableRow';
import { CurrentPlayerIconWhite, TrophyWhiteIcon } from '../../icons';
import { useMediaQuery } from '../../hooks';

type Data = {
  rank: number;
  address: string;
  score: number;
};

export type TableDataRowProps = {
  active?: boolean;
  data: Data;
  hasReward?: boolean;
  shouldChangeStyle?: boolean;
  activeAddress?: string;
};

const Wrapper = styled.div<Pick<TableDataRowProps, 'active' | 'shouldChangeStyle'>>(
  ({ theme, active = false, shouldChangeStyle = false }) => ({
    backgroundColor: 'rgba(233, 204, 255, 0.05)',
    borderRadius: theme.borderRadius(2),
    marginBottom: 1,

    ...(active && {
      position: 'sticky',
      top: 0,
    }),
    ...(active &&
      !shouldChangeStyle && {
        borderRadius: theme.borderRadius(2),
        background: 'rgba(133, 70, 183, 0.50)',
        marginBottom: 1,
      }),
    ...(active &&
      shouldChangeStyle && {
        borderRadius: theme.borderRadius(2),
        background: 'rgba(133, 70, 183, 1)',
        marginBottom: 1,
      }),
  }),
);

const CurrentPlayer = styled.div({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: 'auto 20px',
  columnGap: 8,
});

const EmptySpace = styled.div({
  width: 20,
  height: 20,
});

const rankColors: RankProps['rankColor'][] = ['gold', 'silver', 'bronze'];

export const TableDataRow = ({ data, active, hasReward, shouldChangeStyle, activeAddress }: TableDataRowProps) => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const rewardTsx = useMemo(() => {
    if (!hasReward) {
      return <EmptySpace>{null}</EmptySpace>;
    }
    return <TrophyWhiteIcon />;
  }, [hasReward]);

  return (
    <Wrapper active={active} shouldChangeStyle={shouldChangeStyle} role="row" aria-selected={active}>
      <TableRow
        activeAddress={Boolean(activeAddress)}
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
