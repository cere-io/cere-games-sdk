import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

import { Alert, Address, Button, Stack, Table, TableProps, Typography } from '../../components';
import { RepeatIcon, InsertLinkIcon, TwitterIcon } from '../../icons';
import { useConfigContext, useMediaQuery, useWalletContext } from '../../hooks';

export type LeaderboardProps = Pick<TableProps, 'data'> & {
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
  padding: '0 12px 0 38px',
  '@media (max-width: 600px)': {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

const Row = styled.div(({ columns }: { columns: string }) => ({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: columns,
  alignItems: 'center',
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

const MysteryBlock = styled.div({
  height: 148,
  width: '100%',
  background: 'url(https://assets.cms.freeport.dev.cere.network/box_2eb322256d.png) no-repeat',
  backgroundSize: 'contain',
});

const Container = styled(Stack)({
  width: '100%',
});

const GamePortalButton = styled(Button)({
  background: 'linear-gradient(90deg, rgba(245, 187, 255, 0.3) 0%, rgba(245, 187, 255, 0) 93.55%)',
  padding: '15px 19px',
  justifyContent: 'flex-start',
  whiteSpace: 'nowrap',
  '& > div': {
    fontSize: 14,
    lineHeight: '18px',
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

export const Leaderboard = ({ data, onPlayAgain }: LeaderboardProps) => {
  const [busy, setBusy] = useState(false);
  const { sessionPrice } = useConfigContext();
  const { address, balance = 0 } = useWalletContext();

  const isMobile = useMediaQuery('(max-width: 600px)');

  const handlePlayAgain = useCallback(async () => {
    setBusy(true);
    await onPlayAgain?.();
    setBusy(false);
  }, [onPlayAgain]);

  const handleShareClick = useCallback(() => {
    const tweetBody = `text=Do you think you can beat my Metaverse Dash Run high-score? Play it straight from your browser here: ${window.location.href}&hashtags=metaversadash,web3,gamer`;
    window.open(`https://twitter.com/intent/tweet?${tweetBody}`, '_system', 'width=600,height=600');
  }, []);
  return (
    <Widget>
      <Stack spacing={4}>
        <StyledStack spacing={3}>
          <Container spacing={2}>
            <Alert />
            <Tournament>
              <Row columns={isMobile ? 'auto 140px' : '1fr 1fr'}>
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
                <MysteryBlock />
              </Row>
              <Row columns={isMobile ? 'auto 128px' : 'auto 200px'}>
                <GamePortalButton icon={<InsertLinkIcon />}>Cere game portal</GamePortalButton>
                <TweetButton icon={<TwitterIcon />} variant="outlined" onClick={handleShareClick}>
                  Tweet
                </TweetButton>
              </Row>
            </Tournament>
          </Container>
          <Container direction="column" spacing={3}>
            <BalanceText>
              {sessionPrice} tokens to PLAY (tokens balance: {balance})
            </BalanceText>
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
