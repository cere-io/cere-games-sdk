import styled from '@emotion/styled';

import { Button, Stack, Typography } from '../../components';
import { useWalletContext } from '../../hooks';
import { CereIcon, TrophyIcon } from '../../icons';

export type ConnectWalletProps = {
  onConnect?: () => void;
};

const Connect = styled(Button)(({ theme }) => ({
  ...theme.typography.body1,
  lineHeight: 2.9,
  justifyContent: 'flex-start',
}));

const Widget = styled(Stack)({
  maxWidth: 380,
});

export const ConnectWallet = ({ onConnect }: ConnectWalletProps) => {
  const { isReady, connecting } = useWalletContext();

  console.log({ isReady, connecting });

  return (
    <Widget spacing={4} align="stretch">
      <Stack spacing={3}>
        <TrophyIcon fontSize={90} />

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

        <Button loading={!isReady || connecting} onClick={onConnect}>
          {!isReady ? 'Preparing... Please wait' : 'Connect'}
        </Button>
      </Stack>
    </Widget>
  );
};
