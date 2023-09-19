import { useCallback, useMemo } from 'react';
import styled from '@emotion/styled';

import { useWalletContext, useGameInfo } from '../../hooks';
import { Button, Stack, TableProps, Typography } from '../../components';

export type InsertCoinProps = Pick<TableProps, 'data'> & {
  topUpBalance: () => Promise<void> | void;
};

const TopUp = styled(Button)({
  marginBottom: '20px!important',
  fontSize: 16,
  fontWeight: '24px',
  borderRadius: 4,
  background: 'rgba(243, 39, 88, 1)',
});

const TryMoreGames = styled(Button)({
  background: 'transparent',
  border: '1px solid rgba(255, 255, 255, 1)',
  borderRadius: 4,
  fontSize: 16,
  fontWeight: 600,
  fontFamily: 'Lexend, sans-serif',
});

const Widget = styled(Stack)({
  position: 'relative',
  width: 392,
  '@media (max-width: 600px)': {
    width: 'auto',
  },
});

const HeaderTitle = styled(Typography)({
  fontFamily: 'Yapari-SemiBold, sans-serif',
  color: '#FFF',
  fontSize: 24,
  fontStyle: 'normal',
  fontWeight: 600,
});

const Header = styled(Stack)({
  width: '100%',
  height: 90,
  marginTop: 12,
});

const HeaderText = styled(Typography)({
  width: 257,
  height: 48,
  fontFamily: 'Lexend',
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: '300',
  lineHeight: '24px',
});

export const InsertCoin = ({ topUpBalance, data }: InsertCoinProps) => {
  const { address } = useWalletContext();
  const gameInfo = useGameInfo();

  const playerData = useMemo(() => data && data.find((row) => row.address === address), [data, address]);

  const handleShareClick = useCallback(async () => {
    const tweetBody = `text=Do you think you can beat my ${gameInfo.name} high-score?%0a%0a${address}%0a%0aMy score: ${playerData?.score}%0a%0aPlay it straight from your browser here: ${window.location.href}%0a%0a&hashtags=metaversadash,web3,gamer`;
    window.open(`https://twitter.com/intent/tweet?${tweetBody}`, '_system', 'width=600,height=600');
  }, [address, gameInfo.name, playerData?.score]);

  return (
    <Widget align="stretch">
      <Header style={{ zIndex: 2 }}>
        <HeaderTitle role="heading" aria-level={1} align="center" uppercase>
          insert coin
        </HeaderTitle>
        <HeaderText align="center">
          <Typography align="center">Your balance is 0 tokens.</Typography>
          <Typography align="center">Top up your balance to play more.</Typography>
        </HeaderText>
      </Header>
      <Stack spacing={2} style={{ marginTop: 36 }}>
        <TopUp onClick={topUpBalance}>
          <Typography>Top up balance</Typography>
        </TopUp>
        <TryMoreGames onClick={handleShareClick}>Get 2 $Cere for sharing</TryMoreGames>
      </Stack>
    </Widget>
  );
};
