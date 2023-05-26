import styled from '@emotion/styled';
import { useMemo } from 'react';

import defaultPreloaderImage from '../../assets/preloaderImage.png';
import { Button, ProgressiveImg, Stack, Typography } from '../../components';
import { useAsyncCallback, useGameInfo, useMediaQuery } from '../../hooks';

const ImageBlock = styled.div(({ hasPrelaoder }: { hasPrelaoder: boolean }) => ({
  height: 200,
  alignSelf: 'stretch',
  background: hasPrelaoder ? 'rgba(255, 255, 255, 0.1)' : `url(${defaultPreloaderImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: 12,

  '@media (max-height: 440px)': {
    height: 130,
  },
}));

const Widget = styled(Stack)({
  maxWidth: 400,

  '@media (min-width: 600px)': {
    minWidth: 400,
  },
});

export type PreloaderProps = {
  ready?: boolean;
  onStartClick?: () => Promise<void> | void;
};

export const Preloader = ({ ready = false, onStartClick }: PreloaderProps) => {
  const isLandscape = useMediaQuery('(max-height: 440px)');
  const [handleStartClick, isBusy] = useAsyncCallback(onStartClick);
  const { preloaderPath, preloaderTitle, preloaderDescription } = useGameInfo();

  const preloaderImage = useMemo(
    () => (
      <ImageBlock hasPrelaoder={Boolean(preloaderPath)}>
        {Boolean(preloaderPath) ? <ProgressiveImg src={preloaderPath} alt="preloaderImage" /> : null}
      </ImageBlock>
    ),
    [preloaderPath],
  );

  const title = Boolean(preloaderTitle) ? preloaderTitle : 'Play now & win';

  const description = Boolean(preloaderDescription)
    ? preloaderDescription
    : 'Unlock NFT and token rewards, work your way to the top of the leaderboard and claim a bonus prize!';

  return (
    <Widget spacing={isLandscape ? 2 : 4} align="center">
      {preloaderImage}
      <Stack spacing={1}>
        <Typography align="center" variant="h2">
          {title}
        </Typography>
        <Typography align="center">{description}</Typography>
      </Stack>

      <Button data-testid="preloaderStart" loading={!ready || isBusy} onClick={handleStartClick}>
        {ready ? 'Start' : 'Game loading...'}
      </Button>
    </Widget>
  );
};
