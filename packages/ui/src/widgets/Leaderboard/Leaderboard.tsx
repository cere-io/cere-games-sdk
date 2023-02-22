import styled from '@emotion/styled';

import { Typography } from '../../components';

export type LeaderboardProps = {};

const Widget = styled.div({
  width: 800,
  height: 800,
});

export const Leaderboard = (props: LeaderboardProps) => {
  return (
    <Widget>
      <Typography>Leaderboard</Typography>
    </Widget>
  );
};
