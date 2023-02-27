import styled from '@emotion/styled';

import defaultPreloaderImage from '../../assets/preloaderImage.png';
import { Button, Stack, Typography } from '../../components';
import { useMediaQuery } from '../../hooks';

const Image = styled.div({
  height: 200,
  alignSelf: 'stretch',
  backgroundImage: `url(${defaultPreloaderImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: 12,

  '@media (max-height: 400px)': {
    height: 130,
  },
});

const Widget = styled(Stack)({
  maxWidth: 380,
});

export type PreloaderProps = {
  ready?: boolean;
  onStartClick?: () => void;
};

export const Preloader = ({ ready = false, onStartClick }: PreloaderProps) => {
  const isLandscape = useMediaQuery('(max-height: 400px)');

  return (
    <Widget spacing={isLandscape ? 2 : 4} align="center">
      <Image />
      <Stack spacing={1}>
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
