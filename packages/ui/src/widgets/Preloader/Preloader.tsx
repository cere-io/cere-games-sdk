import styled from '@emotion/styled';

import defaultPreloaderImage from '../../assets/preloaderImage.png';
import { Button, Stack, Typography } from '../../components';

const Widget = styled(Stack)(({ theme }) => ({
  width: 450,
  background: 'linear-gradient(180deg, rgba(176, 138, 255, 0.2) 0%, rgba(37, 121, 255, 0) 100%), #111523',
  boxShadow: '0px 5px 40px rgba(0, 0, 0, 0.4)',
  borderRadius: theme.borderRadius(5),
  padding: theme.spacing(4),
}));

const Image = styled.div({
  height: 200,
  alignSelf: 'stretch',
  backgroundImage: `url(${defaultPreloaderImage})`,
  backgroundSize: 'cover',
  borderRadius: 12,
});

export type PreloaderProps = {
  ready?: boolean;
  onStartClick?: () => void;
};

export const Preloader = ({ ready = false, onStartClick }: PreloaderProps) => {
  return (
    <Widget spacing={4} align="center">
      <Image />
      <Stack spacing={1} padding={[0, 3]}>
        <Typography align="center" variant="h2">
          Play now & win
        </Typography>
        <Typography align="center">
          Unlock NFT and token rewards, work your way to the top of the leaderboard and claim a bonus prize!
        </Typography>
      </Stack>

      <Button loading={!ready} onClick={onStartClick}>
        {ready ? 'Start' : 'Game loading...'}
      </Button>
    </Widget>
  );
};
