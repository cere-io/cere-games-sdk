import styled from '@emotion/styled';

import defaultPreloaderImage from '../../assets/preloaderImage.png';
import { Button, Stack, Typography } from '../../components';
import { useAsyncCallback, useMediaQuery } from '../../hooks';

const Image = styled.div({
  height: 200,
  alignSelf: 'stretch',
  backgroundImage: `url(${defaultPreloaderImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: 12,

  '@media (max-height: 440px)': {
    height: 130,
  },
});

const Widget = styled(Stack)({
  maxWidth: 400,
});

export type PreloaderProps = {
  ready?: boolean;
  onStartClick?: () => Promise<void> | void;
};

export const Preloader = ({ ready = false, onStartClick }: PreloaderProps) => {
  const isLandscape = useMediaQuery('(max-height: 440px)');
  const [handleStartClick, isBusy] = useAsyncCallback(onStartClick);

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

      <Button data-testid="preloaderStart" loading={!ready || isBusy} onClick={handleStartClick}>
        {ready ? 'Start' : 'Game loading...'}
      </Button>
    </Widget>
  );
};
