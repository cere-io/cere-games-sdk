import styled from '@emotion/styled';

import { Button, Stack, Typography } from '../../components';
import { useWalletContext } from '../../hooks';
import { CereIcon, TrophyIcon } from '../../icons';

export type ConnectWalletProps = {
  onNext?: () => void;
  onConnect?: () => void;
};

const Connect = styled(Button)(() => ({
  lineHeight: 2.9,
  justifyContent: 'flex-start',
}));

const Widget = styled(Stack)({
  maxWidth: 380,
});

const truncateAddress = (address: string, maxLength = 30, endingLength = 4) => {
  const ending = address.slice(-endingLength);
  const truncated = address.slice(0, maxLength - endingLength);

  return [truncated, ending].filter(Boolean).join('...');
};

export const ConnectWallet = ({ onConnect, onNext }: ConnectWalletProps) => {
  const { address, loading } = useWalletContext();
  const truncatedAddress = address && truncateAddress(address);

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
        <Connect
          readOnly={!!address}
          loading={loading}
          variant="outlined"
          icon={<CereIcon fontSize={25} />}
          onClick={onConnect}
        >
          {truncatedAddress || 'Cere Wallet'}
        </Connect>
        <Button disabled={!address} onClick={onNext}>
          Next
        </Button>
      </Stack>
    </Widget>
  );
};
