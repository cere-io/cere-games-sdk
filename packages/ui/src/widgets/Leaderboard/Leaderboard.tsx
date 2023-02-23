import styled from '@emotion/styled';

import { Table, TableProps } from '../../components';
// import { useWalletContext } from '../../hooks';

export type LeaderboardProps = Pick<TableProps, 'data'>;

const Widget = styled.div({
  width: '80vw',
  maxWidth: 660,
  height: 800,
});

export const Leaderboard = ({ data }: LeaderboardProps) => {
  // const { address } = useWalletContext();
  const address = '0xb05C3839202a314Cb7CC87c7FF7e216d6743aD5b'; // TODO: Use real address

  return (
    <Widget>
      <Table data={data} activeAddress={address} />
    </Widget>
  );
};
