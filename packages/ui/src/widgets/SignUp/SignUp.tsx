import styled from '@emotion/styled';

import { preloaderImage } from '../../assets';
import { Button, ProgressiveImg, Spinner, Stack, Typography } from '../../components';
import { useAsyncCallback, useGameInfo, useMediaQuery } from '../../hooks';
import { PreloaderProps } from "../Preloader";

const ImageBlock = styled.div(
  {
    alignSelf: 'stretch',
    height: 200,
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
    minWidth: 400,
  },
});

const StyledTypography = styled(Typography)({
  whiteSpace: 'pre-line',
});

const StartButton = styled(Button)({
  marginTop: 'auto',
});



export const SignUp = ({ ready = false, onStartClick }: PreloaderProps) => {
  const isLandscape = useMediaQuery('(max-height: 440px)');
  const [handleStartClick, isBusy] = useAsyncCallback(onStartClick);
  const { loading, preloader } = useGameInfo();

  return (
    <Widget spacing={isLandscape ? 2 : 4} align="center">
      <ImageBlock hasPreloader={!!preloader.url} loading={loading}>
        {loading ? (
          <Spinner size="25" />
        ) : (
          preloader.url && <ProgressiveImg src={preloader.url} alt="Preloader image" />
        )}
      </ImageBlock>

      {!loading && (
        <Stack spacing={1}>
          <Typography align="center" variant="h2">
            awerergsdfgsdfgsdfgsdfg
          </Typography>

          <StyledTypography align="center">
            {preloader.description ||
              'Unlock NFT and token rewards, work your way to the top of the leaderboard and claim a bonus prize!'}
          </StyledTypography>
        </Stack>
      )}

      <StartButton data-testid="preloaderStart" loading={!ready || isBusy} onClick={handleStartClick}>
        {ready ? 'Start' : 'Game loading...'}
      </StartButton>
    </Widget>
  );
};
