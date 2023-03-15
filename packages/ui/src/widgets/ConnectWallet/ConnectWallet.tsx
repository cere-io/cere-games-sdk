import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';

import { Button, Stack, Typography, WalletBenefits } from '../../components';
import { useMediaQuery, useWalletContext } from '../../hooks';

export type ConnectWalletProps = {
  onConnect?: () => Promise<void> | void;
  score?: number;
};

const Connect = styled(Button)(() => ({
  marginBottom: '20px!important',
}));

const Widget = styled(Stack)({
  position: 'relative',
  maxWidth: 600,
  '@media (max-width: 600px)': {
    maxWidth: '100%',
    width: '100%',
    height: '100vh',
  },
});

const AnimationBlock = styled.div(({ showConfetti }: { showConfetti: boolean }) => ({
  zIndex: 2,
  position: 'absolute',
  top: '-30%',
  width: '100%',
  height: '100%',
  background: showConfetti
    ? 'url(https://assets.cms.freeport.dev.cere.network/animation_640_lf88b7kr_aa5d097cd4.gif)'
    : '',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  '@media (max-width: 600px)': {
    top: '-15%',
  },
}));

const StyledNumber = styled.span({
  background: 'linear-gradient(79.06deg, #75ACFF 0%, #27E3C1 100%)',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

const HeaderTitle = styled(Typography)({
  fontFamily: 'Bebas Neue, sans-serif',
  fontSize: '32px',
  lineHeight: '38px',
  textAlign: 'center',
  letterSpacing: '0.01em',
  textTransform: 'uppercase',
  color: 'rgba(255, 255, 255, 0.9)',
});

const HeaderSubTitle = styled(HeaderTitle)({
  fontStyle: 'normal',
  fontSize: '46px',
  lineHeight: '55px',
});

const ConnectDetailsText = styled(Typography)({
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '18px',
  textAlign: 'center',
  textTransform: 'uppercase',
});

const ByCereText = styled.span({
  fontWeight: 400,
  fontSize: 12,
  lineHeight: '20px',
  letterSpacing: '0.01em',
  color: '#CBCBCB',
  textAlign: 'center',
});

export const ConnectWallet = ({ onConnect, score }: ConnectWalletProps) => {
  const isLandscape = useMediaQuery('(max-height: 440px)');
  const [busy, setBusy] = useState(false);
  const [showConfetti, setShow] = useState(true);
  const { isReady, connecting } = useWalletContext();

  useEffect(() => {
    const timeoutId = setTimeout(() => setShow(false), 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  });

  const handleConnect = useCallback(async () => {
    setBusy(true);
    await Promise.resolve(onConnect?.());
    setBusy(false);
  }, [onConnect]);

  return (
    <Widget spacing={isLandscape ? 2 : 4} align="stretch">
      <AnimationBlock showConfetti={showConfetti} />
      <Stack spacing={4}>
        <Stack>
          <Stack>
            <HeaderTitle>Congratulations!</HeaderTitle>
            <HeaderSubTitle>
              Your score: <StyledNumber>{score}</StyledNumber>
            </HeaderSubTitle>
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <ConnectDetailsText>CONNECT your wallet to:</ConnectDetailsText>
          <WalletBenefits />
        </Stack>
      </Stack>
      <Stack spacing={2}>
        <Connect loading={!isReady || connecting || busy} onClick={handleConnect}>
          {!isReady ? 'Preparing... Please wait' : 'Claim 20 free tokens'}
        </Connect>
        <ByCereText>Powered by Cere Gaming Cloud</ByCereText>
      </Stack>
    </Widget>
  );
};
