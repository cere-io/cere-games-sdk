import styled from '@emotion/styled';
import { useCallback, useMemo } from 'react';

import { Alert, Address, Button, Stack, Table, TableProps, Typography } from '../../components';
import { RepeatIcon, InsertLinkIcon, TwitterIcon } from '../../icons';
import { useAsyncCallback, useConfigContext, useGameInfo, useMediaQuery, useWalletContext } from '../../hooks';

type TournamentType = {
  id: number;
  title: string;
  subtitle: string;
  startDate: Date;
  endDate: Date;
  status: 'DISABLED' | 'ENABLED';
};

export type LeaderboardProps = Pick<TableProps, 'data'> & {
  activeTournament: TournamentType | undefined;
  onPlayAgain?: () => Promise<void> | void;
  onTweet?: () => Promise<void> | void;
  serviceUrl: string;
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

const MysteryBlock = styled.div(({ url }: { url: string }) => ({
  height: 148,
  width: '100%',
  background: `url(${url}) no-repeat`,
  backgroundSize: '90%',
  backgroundPositionY: 'center',
  marginBottom: 25,
}));

const Container = styled(Stack)({
  width: '100%',
});

const GamePortalButton = styled(Button)({
  background: 'linear-gradient(90deg, rgba(245, 187, 255, 0.3) 0%, rgba(245, 187, 255, 0) 93.55%)',
  padding: '15px 13px',
  justifyContent: 'flex-start',
  whiteSpace: 'nowrap',
  gridColumnGap: 4,
  '& > div': {
    padding: 0,
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

export const Leaderboard = ({ data, activeTournament, onPlayAgain, onTweet }: LeaderboardProps) => {
  const { sessionPrice, gamePortalUrl, staticAssets } = useConfigContext();
  const gameInfo = useGameInfo();
  const { address, balance = 0, isReady } = useWalletContext();
  const playerData = useMemo(() => data.find((row) => row.address === address), [data, address]);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const twitterTags = gameInfo?.tags && gameInfo?.tags.length > 0 ? gameInfo.tags.join(',') : '';

  const [handlePlayAgain, isBusy] = useAsyncCallback(onPlayAgain);
  const handleOpenGamePortal = useCallback(() => {
    window.location.href = gamePortalUrl;
  }, [gamePortalUrl]);

  const handleShareClick = useCallback(async () => {
    await onTweet?.();
    const tweetBody = `text=Do you think you can beat my ${gameInfo.name} high-score?%0a%0a${address}%0a%0aMy score: ${playerData?.score}%0a%0aPlay it straight from your browser here: ${window.location.href}%0a%0a&hashtags=${twitterTags}`;
    window.open(`https://twitter.com/intent/tweet?${tweetBody}`, '_system', 'width=600,height=600');
  }, [address, gameInfo.name, onTweet, playerData?.score, twitterTags]);

  const dayDifference = useMemo(() => {
    if (!activeTournament) {
      return undefined;
    }
    const tournamentEndDate = new Date(activeTournament.endDate);
    const dateNow = new Date();
    const diffInTime = tournamentEndDate.getTime() - dateNow.getTime();
    return Math.ceil(Math.abs(diffInTime / (1000 * 3600 * 24)));
  }, [activeTournament]);

  return (
    <Widget>
      <Stack spacing={3}>
        <StyledStack spacing={3}>
          <Container spacing={2}>
            <Alert />
            <Tournament>
              <Row columns={isMobile ? 'auto 140px' : '1fr 1fr'}>
                <div>
                  <Stack spacing={2} align="start">
                    <Stack spacing={1} align="start">
                      <Typography variant="caption" uppercase fontWight="semi-bold">
                        {`${activeTournament ? activeTournament.title : 'Weekly tournament'}`}
                      </Typography>
                      <TimeLeftText fontWight="bold">
                        Time left: <span>{dayDifference ? dayDifference : 1} day</span>
                      </TimeLeftText>
                    </Stack>
                    {!activeTournament ? (
                      <StyledTypography variant="h1" uppercase>
                        TOP 20 players wins <br /> UNIQUE NFT
                      </StyledTypography>
                    ) : (
                      <StyledTypography variant="h1" uppercase>
                        {activeTournament?.subtitle}
                      </StyledTypography>
                    )}
                  </Stack>
                </div>
                <MysteryBlock url={staticAssets.mysteryBox} />
              </Row>
              <Row columns={isMobile ? 'auto 128px' : 'auto 145px'}>
                <GamePortalButton icon={<InsertLinkIcon />} onClick={handleOpenGamePortal}>
                  Cere game portal
                </GamePortalButton>
                <TweetButton disabled={!isReady} icon={<TwitterIcon />} variant="outlined" onClick={handleShareClick}>
                  Tweet
                </TweetButton>
              </Row>
            </Tournament>
          </Container>
          <Container direction="column" spacing={1.8}>
            <BalanceText>
              {sessionPrice} tokens to PLAY (tokens balance: {balance.toFixed(2)})
            </BalanceText>
            <Button
              disabled={balance < sessionPrice}
              loading={isBusy}
              icon={<RepeatIcon />}
              onClick={handlePlayAgain}
              style={{ width: 243 }}
            >
              <Typography
                style={{ fontSize: 16, lineHeight: '22px', textTransform: 'uppercase' }}
                variant="inherit"
                noWrap
              >
                Play again
              </Typography>
            </Button>
          </Container>
        </StyledStack>
        <StyledStack direction="row" spacing="space-between">
          <Typography style={{ fontFamily: 'Bebas Neue', fontSize: 36 }} variant="h1">
            Leaderboard
          </Typography>
          {address && <Address aria-label="Wallet address" address={address} />}
        </StyledStack>
      </Stack>

      <Table data={data} activeAddress={address} hasTournament={Boolean(activeTournament)} />
    </Widget>
  );
};
