import styled from '@emotion/styled';

import { Button, Stack, Typography } from '../../components';
import { CereIcon, TrophyIcon } from '../../icons';

export type ConnectWalletProps = {};

const Connect = styled(Button)(() => ({
  lineHeight: 2.9,
  justifyContent: 'flex-start',
}));

export const ConnectWallet = (props: ConnectWalletProps) => {
  return (
    <Stack spacing={4} align="stretch">
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
        <Connect variant="outlined" icon={<CereIcon fontSize={25} />}>
          Cere Wallet
        </Connect>
        <Button disabled>Next</Button>
      </Stack>
    </Stack>
  );
};
