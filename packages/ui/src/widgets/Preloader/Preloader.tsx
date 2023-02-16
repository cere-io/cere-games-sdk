import styled from '@emotion/styled';

import { Button, Stack, Typography } from '../../components';

const Widget = styled(Stack)(({ theme }) => ({
  width: 450,
  background: 'linear-gradient(-45deg, #7B1345 0%, #050407 100%)',
  borderRadius: theme.borderRadius(5),
  padding: theme.spacing(6, 4, 4, 4),
}));

const Image = styled.div({
  width: 320,
  height: 165,
  backgroundColor: '#7B1345',
  borderRadius: 12,
});

export const Preloader = () => {
  return (
    <Widget spacing={3} align="center">
      <Image />
      <Stack spacing={1} padding={[0, 4]}>
        <Typography align="center" variant="h2">
          Play now & win
        </Typography>
        <Typography align="center">
          Unlock NFT and token rewards, work your way to the top of the leaderboard and claim a bonus prize!
        </Typography>
      </Stack>

      <Button>Start</Button>
    </Widget>
  );
};
