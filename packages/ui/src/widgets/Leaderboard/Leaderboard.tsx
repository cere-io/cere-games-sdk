import styled from '@emotion/styled';

import { Address, Button, Stack, Table, TableProps, Typography } from '../../components';
import RepeatIcon from '../../icons/RepeatIcon';
// import { useWalletContext } from '../../hooks';

export type LeaderboardProps = Pick<TableProps, 'data'> & {
  onPlayAgain?: () => void;
};

const Widget = styled.div({
  width: '80vw',
  maxWidth: 660,
});

export const Leaderboard = ({ data, onPlayAgain }: LeaderboardProps) => {
  // const { address } = useWalletContext();
  const address = '0xb05C3839202a314Cb7CC87c7FF7e216d6743aD5b'; // TODO: Use real address

  return (
    <Widget>
      <Stack direction="row" spacing={2} margin={[0, 0, 4]}>
        <Button icon={<RepeatIcon />} onClick={onPlayAgain}>
          Play again
        </Button>
        <Button disabled>Open Game Portal</Button>
      </Stack>
      <Stack direction="row" spacing="space-between">
        <Typography variant="h1">Leaderboard</Typography>
        <Address address={address} />
      </Stack>

      <Table data={data} activeAddress={address} />
    </Widget>
  );
};
