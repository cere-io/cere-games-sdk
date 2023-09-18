import styled from '@emotion/styled';
import { useMemo } from 'react';

import { Button, ProgressiveImg, Stack, Typography, Steps } from '../../components';
import { useAsyncCallback, useConfigContext, useGameInfo, useMediaQuery, useWalletContext } from '../../hooks';

const ImageBlock = styled.div(
  {
    alignSelf: 'stretch',
    height: 280,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,

    '@media (max-height: 440px)': {
      height: 130,
    },
  },
  ({ loading }: { loading: boolean }) =>
    loading
      ? {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }
      : {},
);

const Widget = styled(Stack)({
  maxWidth: 345,
  height: 'auto',
  maxHeight: 608,

  '@media (min-width: 600px)': {
    minWidth: 492,
  },
});

const Title = styled(Typography)({
  marginBottom: '24px !important',
});

const StyledTypography = styled(Typography)({
  whiteSpace: 'pre-line',
});

const StartButton = styled(Button)(
  {
    marginTop: 'auto',
  },
  ({ loading }) => ({
    background: loading ? '#161D30' : '#F32758',
    borderRadius: 4,
  }),
);

export type PreloaderProps = {
  ready?: boolean;
  onStartClick?: () => Promise<void> | void;
  navigateLeaderBoardWidget?: () => void;
};

export const Preloader = ({ ready = false, onStartClick, navigateLeaderBoardWidget }: PreloaderProps) => {
  const isLandscape = useMediaQuery('(max-height: 440px)');
  const [handleStartClick, isBusy] = useAsyncCallback(onStartClick);
  const { loading, preloader, name } = useGameInfo();
  const { sdkUrl: cdnUrl } = useConfigContext();
  const { address } = useWalletContext();
  const lsInfo = useMemo(() => {
    const info = localStorage.getItem(`game-info-${name}`);
    if (info) {
      return JSON.parse(info);
    }
    return;
  }, [name]);

  if (lsInfo && lsInfo.name === name && (address || lsInfo.address)) {
    const playAgain = localStorage.getItem('play');
    if (!playAgain && playAgain !== 'true') {
      navigateLeaderBoardWidget?.();
    }
  }

  return (
    <Widget spacing={isLandscape ? 2 : 4} align="center">
      <ImageBlock loading={loading}>
        {/*{preloader.url && <ProgressiveImg src={`${cdnUrl}/assets/default-preloader.png`} alt="Preloader image" />}*/}
        {/*  TODO remove after review */}
        <ProgressiveImg src={preloader.url || `${cdnUrl}/assets/default-preloader.png`} alt="Preloader image" />
      </ImageBlock>
      {!loading && (
        <Title align="center" variant="h2">
          {preloader.title || 'Play & Earn $CERE'}
        </Title>
      )}
      <Steps />
      <StartButton data-testid="preloaderStart" loading={!ready || isBusy} onClick={handleStartClick}>
        {ready ? 'Play Now' : 'Game loading...'}
      </StartButton>
    </Widget>
  );
};
