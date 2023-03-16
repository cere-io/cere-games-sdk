import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

import { Alert, Address, Button, Stack, Table, TableProps, Typography } from '../../components';
import { RepeatIcon, InsertLinkIcon, TwitterIcon } from '../../icons';
import { useWalletContext } from '../../hooks';

export type LeaderboardProps = Pick<TableProps, 'data'> & {
  sessionPrice?: number;
  onPlayAgain?: () => Promise<void> | void;
};

const Widget = styled.div({
  maxWidth: 600,

  '@media (max-width: 600px)': {
    position: 'relative',
    width: 'auto',
  },
});

const Tournament = styled.div({
  width: '100%',
  padding: '16px 12px 0 38px',
});

const Row = styled.div(({ columns }: { columns: string }) => ({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: columns,
}));

const TimeLeftText = styled(Typography)({
  fontSize: 10,
  lineHeight: '12.5px',
  textTransform: 'uppercase',
  color: 'rgba(255, 255, 255, 0.8)',
  '& > span': {
    fontWeight: 900,
    color: '#ffffff',
  },
});

const StyledImage = styled.img({
  position: 'absolute',
  right: 0,
  top: -45,
});

const MysteryBlock = styled.div({
  height: 148,
  width: '100%',
});

const Container = styled(Stack)({
  width: '100%',
});

const GamePortalButton = styled(Button)({
  background: 'linear-gradient(90deg, rgba(245, 187, 255, 0.3) 0%, rgba(245, 187, 255, 0) 93.55%)',
  padding: '18.5px 16px',
  justifyContent: 'flex-start',
  textTransform: 'uppercase',
  '& > div': {
    fontFamily: 'Bebas Neue',
    fontSize: 24,
    lineHeight: '32px',
  },
});

const TweetButton = styled(Button)({
  border: '1px solid #1DA1F2',
  filter: 'drop-shadow(0px 0px 80px rgba(125, 35, 214, 0.8))',
});

const BalanceText = styled.p({
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '16px',
  color: '#FFFFFF',
  marginTop: 0,
  '& > span': {
    fontWeight: 500,
  },
});

const StyledStack = styled(Stack)({
  width: '100%',
});

const StyledTypography = styled(Typography)({
  fontFamily: 'Bebas Neue',
  fontSize: 24,
  lineHeight: '29px',
  letterSpacing: '0.01em',
});

export const Leaderboard = ({ data, sessionPrice = 0, onPlayAgain }: LeaderboardProps) => {
  const [busy, setBusy] = useState(false);
  const { address, balance = 0 } = useWalletContext();

  const handlePlayAgain = useCallback(async () => {
    setBusy(true);
    await onPlayAgain?.();
    setBusy(false);
  }, [onPlayAgain]);

  const handleShareClick = useCallback(() => {
    const tweetBody =
      'text=Do you think you can beat my Metaverse Dash Run high-score? Play it straight from your browser here: https://node-0.v2.cdn.devnet.cere.network/ddc/buc/23/file/a85ef422-5bc6-4cc5-9a3f-abfc9339258b/index.html&hashtags=metaversadash,web3,gamer';
    window.open(`https://twitter.com/intent/tweet?${tweetBody}`, '_system', 'width=600,height=600');
  }, []);
  return (
    <Widget>
      <Stack spacing={4}>
        <StyledStack spacing={3}>
          <Container spacing={2}>
            <Alert />
            <Tournament>
              <Row columns="1fr 1fr">
                <div>
                  <Stack spacing={2} align="start">
                    <Stack spacing={1} align="start">
                      <Typography variant="caption" uppercase fontWight="semi-bold">
                        Weekly tournament
                      </Typography>
                      <TimeLeftText fontWight="bold">
                        Time left: <span>1 day</span>
                      </TimeLeftText>
                    </Stack>
                    <StyledTypography variant="h1" uppercase>
                      TOP 20 players wins <br /> UNIQUE NFT
                    </StyledTypography>
                  </Stack>
                </div>
                <MysteryBlock>
                  <StyledImage src="https://assets.cms.freeport.dev.cere.network/mystery_box_21d18c2011.png" alt="" />
                </MysteryBlock>
              </Row>
              <Row columns="auto 200px">
                <GamePortalButton icon={<InsertLinkIcon />}>cere game PORTAL</GamePortalButton>
                <TweetButton icon={<TwitterIcon />} variant="outlined" onClick={handleShareClick}>
                  Tweet
                </TweetButton>
              </Row>
            </Tournament>
          </Container>
          <Container direction="column" spacing={3}>
            <BalanceText>2 tokens to PLAY (tokens balance: {balance})</BalanceText>
            <Button
              disabled={balance < sessionPrice}
              loading={busy}
              icon={<RepeatIcon />}
              onClick={handlePlayAgain}
              style={{ width: 243 }}
            >
              <Typography variant="inherit" noWrap>
                Play again
              </Typography>
            </Button>
          </Container>
        </StyledStack>
        <StyledStack direction="row" spacing="space-between">
          <Typography variant="h1">Leaderboard</Typography>
          {address && <Address address={address} />}
        </StyledStack>
      </Stack>

      <Table data={data} activeAddress={address} />
    </Widget>
  );
};
