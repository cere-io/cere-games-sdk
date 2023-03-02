import styled from '@emotion/styled';

import { Address, Button, Stack, Table, TableProps, Typography, NftReward } from '../../components';
import { RepeatIcon } from '../../icons';
import { useWalletContext } from '../../hooks';

export type LeaderboardProps = Pick<TableProps, 'data'> & {
  onPlayAgain?: () => void;
};

const Widget = styled.div({
  width: '80vw',
  maxWidth: 660,

  '@media (max-width: 600px)': {
    width: 'auto',
  },
});

export const Leaderboard = ({ data, onPlayAgain }: LeaderboardProps) => {
  const { address } = useWalletContext();

  return (
    <Widget>
      <Stack direction="row" spacing={2} margin={[0, 0, 3]}>
        <NftReward data={data} address={'0x2350d687a8bf2e2be0ef5a28940b05107d79211d'} />
      </Stack>
      <Stack direction="row" spacing={2} margin={[0, 0, 4]}>
        <Button icon={<RepeatIcon />} onClick={onPlayAgain}>
          Play again
        </Button>
        <Button disabled>Open Game Portal</Button>
      </Stack>
      <Stack direction="row" spacing="space-between">
        <Typography variant="h1">Leaderboard</Typography>
        {address && <Address address={address} />}
      </Stack>

      <Table data={data} activeAddress={address} />
    </Widget>
  );
};
