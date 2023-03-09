import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

import { Button, Stack, Typography } from '../../components';
import { useMediaQuery, useWalletContext } from '../../hooks';
import { CereIcon } from '../../icons';
import { ArrowIcon } from '../../icons/ArrowIcon';
import { PrizesList } from '../../components/PrizesList';

export type ConnectWalletProps = {
  onConnect?: () => Promise<void> | void;
};

const Connect = styled(Button)(() => ({
  marginBottom: '20px!important',
}));

const Widget = styled(Stack)({
  maxWidth: 600,
  '@media (max-width: 600px)': {
    maxWidth: '100%',
    width: '100%',
    height: '100vh',
  },
});

const WalletHeader = styled.div({
  textAlign: 'center',
});

const StyledNumber = styled.span({
  background: 'linear-gradient(79.06deg, #75ACFF 0%, #27E3C1 100%)',
  backgroundClip: 'text',
  '-webkit-text-fill-color': 'transparent',
});

const ScoreText = styled(Typography)({
  fontFamily: "'Lexend', sans-serif",
  letterSpacing: '0.01em',
  textTransform: 'uppercase',
  color: 'rgba(255, 255, 255, 0.9)',
});

const PayTokensText = styled.span({
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '18px',
  color: '#FFFCFC',
  textAlign: 'center',
  marginBottom: '14px!important',
});

const ByCereText = styled.span({
  fontWeight: 400,
  fontSize: 12,
  lineHeight: '20px',
  letterSpacing: '0.01em',
  color: '#CBCBCB',
  textAlign: 'center',
});

export const ConnectWallet = ({ onConnect }: ConnectWalletProps) => {
  const isLandscape = useMediaQuery('(max-height: 440px)');
  const [busy, setBusy] = useState(false);
  const { isReady, connecting } = useWalletContext();

  const handleConnect = useCallback(async () => {
    setBusy(true);
    await Promise.resolve(onConnect?.());
    setBusy(false);
  }, [onConnect]);

  return (
    <Widget spacing={isLandscape ? 2 : 4} align="stretch">
      <Stack spacing={4}>
        <WalletHeader>
          <Stack spacing={1}>
            <Stack>
              <ScoreText align="center" variant="h2">
                Your Rank: <StyledNumber>112</StyledNumber>
              </ScoreText>
              <ScoreText align="center" variant="h2">
                Score: <StyledNumber>13 200</StyledNumber>
              </ScoreText>
            </Stack>
            <ArrowIcon />
          </Stack>
        </WalletHeader>
        <Stack spacing={3}>
          <Typography align="center" variant="h2">
            Win tournament and <br /> claim prizes
          </Typography>
          <PrizesList />
        </Stack>
      </Stack>
      <PayTokensText>Pay 2 $CERE tokens to join</PayTokensText>
      <Connect loading={!isReady || connecting || busy} icon={<CereIcon fill="white" />} onClick={handleConnect}>
        {!isReady ? 'Preparing... Please wait' : 'Connect Cere Wallet'}
      </Connect>
      <ByCereText>Powered by Cere Gaming Cloud</ByCereText>
    </Widget>
  );
};

//Connect or create a wallet to collect

// NFTs, achievements and $CERE tokens
