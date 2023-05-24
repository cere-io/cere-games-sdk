import styled from '@emotion/styled';
import { useMemo } from 'react';

import defaultPreloaderImage from '../../assets/preloaderImage.png';
import { Button, Stack, Typography } from '../../components';
import { useAsyncCallback, useMediaQuery } from '../../hooks';

const ImageBlock = styled.div(({ hasPrelaoder }: { hasPrelaoder: boolean }) => ({
  height: 200,
  alignSelf: 'stretch',
  backgroundImage: !hasPrelaoder ? `url(${defaultPreloaderImage})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: 12,

  '@media (max-height: 440px)': {
    height: 130,
  },
}));

const Image = styled.img({
  height: 200,
  width: '100%',
  objectFit: 'fill',
  borderRadius: 12,
  '@media (max-height: 440px)': {
    height: 130,
  },
});

const Widget = styled(Stack)({
  maxWidth: 400,

  '@media (min-width: 600px)': {
    minWidth: 400,
  },
});

export type PreloaderProps = {
  ready?: boolean;
  onStartClick?: () => Promise<void> | void;
  preloaderPath?: string;
  preloaderTitle?: string;
  preloaderDescription?: string;
};

export const Preloader = ({
  ready = false,
  onStartClick,
  preloaderPath,
  preloaderTitle,
  preloaderDescription,
}: PreloaderProps) => {
  const isLandscape = useMediaQuery('(max-height: 440px)');
  const [handleStartClick, isBusy] = useAsyncCallback(onStartClick);

  const preloaderImage = useMemo(
    () => (
      <ImageBlock hasPrelaoder={Boolean(preloaderPath)}>
        {Boolean(preloaderPath) && <Image src={preloaderPath} alt="" loading="lazy" />}
      </ImageBlock>
    ),
    [preloaderPath],
  );

  const title = useMemo(() => (Boolean(preloaderTitle) ? preloaderTitle : 'Play now & win'), [preloaderTitle]);

  const description = useMemo(
    () =>
      Boolean(preloaderDescription)
        ? preloaderDescription
        : 'Unlock NFT and token rewards, work your way to the top of the leaderboard and claim a bonus prize!',
    [preloaderDescription],
  );

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
