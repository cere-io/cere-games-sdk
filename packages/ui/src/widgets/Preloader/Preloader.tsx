import styled from '@emotion/styled';

import { preloaderImage } from '../../assets';
import { Button, ProgressiveImg, Stack, Typography, Steps } from '../../components';
import { useAsyncCallback, useGameInfo, useMediaQuery } from '../../hooks';

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
  ({ hasPreloader, loading }: { hasPreloader: boolean; loading: boolean }) =>
    loading
      ? {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }
      : {
          backgroundImage: hasPreloader ? undefined : `url(${preloaderImage})`,
        },
);

const Widget = styled(Stack)({
  maxWidth: 400,
  minHeight: 415,

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

const StartButton = styled(Button)({
  marginTop: 'auto',
},
  ({ loading }) => ({
    background: loading ? '#161D30' : '#F32758', // TODO fix when color theme will be ready
    borderRadius: loading ? 12 : 4
  }),
);

export type PreloaderProps = {
  ready?: boolean;
  onStartClick?: () => Promise<void> | void;
};

export const Preloader = ({ ready = false, onStartClick }: PreloaderProps) => {
  const isLandscape = useMediaQuery('(max-height: 440px)');
  const [handleStartClick, isBusy] = useAsyncCallback(onStartClick);
  const { loading, preloader } = useGameInfo();

  return (
    <Widget spacing={isLandscape ? 2 : 4} align="center">
      <ImageBlock hasPreloader={!!preloader.url} loading={loading}>
        {preloader.url && <ProgressiveImg src={preloader.url} alt="Preloader image" />}
      </ImageBlock>
      {!loading && (
        <Title align="center" variant="h2">
          {preloader.title || 'Play & Earn $CERE'}
        </Title>
      )}
      {preloader.description ?
        <StyledTypography align="center">
          {preloader.description}
        </StyledTypography>
        : <Steps />}

      <StartButton data-testid="preloaderStart" loading={!ready || isBusy} onClick={handleStartClick}>
        {ready ? 'Play Now' : 'Game loading...'}
      </StartButton>
    </Widget>
  );
};
