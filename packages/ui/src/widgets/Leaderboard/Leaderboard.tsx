import styled from '@emotion/styled';
import { useCallback, useMemo } from 'react';

import {
  Button,
  Stack,
  Table,
  TableProps,
  Typography,
  Wrapper,
  RadialGradientBackGround, Content
} from '../../components';
import { useAsyncCallback, useConfigContext, useMediaQuery, useWalletContext } from '../../hooks';
import { TopWidget } from "./TopWidget";

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
  onTweet?: (score: number) => Promise<{ tweetBody: string }>;
  serviceUrl: string;
  withTopWidget?: boolean;
};

const Widget = styled.div({
  maxWidth: 600,

  '@media (max-width: 600px)': {
    position: 'relative',
    width: 'auto',
  },
});

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

const LeaderboardTitle = styled(Typography)({
  fontFamily: 'Yapari-SemiBold',
  fontSize: 18,
  fontStyle: 'normal',
  fontWeight: 600,
  linHeight: 32,
  textTransform: 'uppercase',
  textAlign: "center",
});

const SignUpButton = styled(Button)({
  width: 280,
  height: 52,
  borderRadius: 4,
  border: '1px solid #F32758',
  background: '#1B0B2A',
  padding: '15px 16px',
  fontFamily: 'Lexend',
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: 600,
  textTransform: 'capitalize',
  margin: '6px auto 16px auto',
})

export const Leaderboard = ({ data, activeTournament, onPlayAgain, onTweet, withTopWidget }: LeaderboardProps) => {
  const { sessionPrice, gamePortalUrl, staticAssets } = useConfigContext();
  const { address, balance = 0, isReady } = useWalletContext();
  const playerData = useMemo(() => data.find((row) => row.address === address), [data, address]);
  const isMobile = useMediaQuery('(max-width: 600px)');


  const [handlePlayAgain, isBusy] = useAsyncCallback(onPlayAgain);
  const handleOpenGamePortal = useCallback(() => {
    window.location.href = gamePortalUrl;
  }, [gamePortalUrl]);

  const handleShareClick = useCallback(async () => {
    const tweet = await onTweet?.(playerData?.score as number);
    window.open(`https://twitter.com/intent/tweet?${tweet?.tweetBody}`, '_system', 'width=600,height=600');
  }, [onTweet, playerData?.score]);

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
    <>
      {withTopWidget &&
        <TopWidget
          onPlayAgain={handlePlayAgain}
          disabled={balance < sessionPrice}
      />}
      <Wrapper>
        <RadialGradientBackGround/>
        <Content>
          <LeaderboardTitle>leaderboard</LeaderboardTitle>
          <Stack align="center">
            <SignUpButton>
              Sign Up to unlock score
            </SignUpButton>
          </Stack>
          <Table
            data={data}
            activeAddress={address}
            hasTournament={Boolean(activeTournament)}
          />
        </Content>
      </Wrapper>
    </>
  );
};
