import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

import { Button, Stack, Typography } from '../../components';
import { useMediaQuery, useWalletContext } from '../../hooks';
import { CereIcon, TrophyIcon } from '../../icons';

export type ConnectWalletProps = {
  onConnect?: () => Promise<void> | void;
};

const Connect = styled(Button)(({ theme }) => ({
  ...theme.typography.body1,
  justifyContent: 'flex-start',
  height: 48,
}));

const Widget = styled(Stack)({
  maxWidth: 380,
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
      <Stack spacing={3}>
        {!isLandscape && <TrophyIcon fontSize={90} />}

        <Stack spacing={1}>
          <Typography align="center" variant="h2">
            Connect & Collect rewards
          </Typography>
          <Typography align="center" color="secondary">
            Connect your wallet to collect your
            <Typography inline color="primary">
              NFT, achievements, Cere tokens
            </Typography>{' '}
            see your place on the leaderboard!
          </Typography>
        </Stack>
      </Stack>

      <Stack spacing={2} align="stretch">
        <Connect readOnly variant="outlined" icon={<CereIcon fontSize={25} />}>
          Cere Wallet
        </Connect>

        <Button loading={!isReady || connecting || busy} onClick={handleConnect}>
          {!isReady ? 'Preparing... Please wait' : 'Connect'}
        </Button>
      </Stack>
    </Widget>
  );
};
