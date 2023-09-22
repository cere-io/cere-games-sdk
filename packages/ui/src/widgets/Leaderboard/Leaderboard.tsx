import styled from '@emotion/styled';
import { useMemo } from 'react';

import {
  Stack,
  Table,
  TableProps,
  Typography,
  ModalWrapper,
  RadialGradientBackGround,
  Content,
  Truncate,
  Alert,
} from '../../components';
import { useAsyncCallback, useConfigContext, useWalletContext } from '../../hooks';
import { TopWidget } from './TopWidget';

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
  onShowSignUp?: () => void;
};

const LeaderboardTitle = styled(Typography)({
  fontFamily: 'Yapari-SemiBold',
  fontSize: 18,
  fontStyle: 'normal',
  fontWeight: 600,
  linHeight: 32,
  textTransform: 'uppercase',
  textAlign: 'center',
  '@media (max-width: 600px)': {
    fontSize: 13,
  },
});

const Address = styled.div({
  width: 105,
  height: 36,
  padding: '8px 16px',
  background: 'rgba(233, 204, 255, 0.1)',
  borderRadius: 4,
  fontSize: 14,
});

const SignUpButton = styled.button({
  width: 'auto',
  height: 52,
  borderRadius: 4,
  border: '1px solid #F32758',
  background: 'rgba(243, 39, 88, 1)',
  padding: '15px 16px',
  fontFamily: 'Lexend',
  fontSize: 15,
  fontStyle: 'normal',
  fontWeight: 600,
  textTransform: 'capitalize',
  margin: '6px auto 16px auto',
  color: '#FFF',
  lineHeight: '22px',
  '&:hover': {
    cursor: 'pointer',
  },
});

const Alerts = styled.div({
  zIndex: 100,
  position: 'absolute',
  right: 39,
  top: 32,
  display: 'grid',
  gridTemplateRows: '1fr 1fr',
  gridRowGap: '5px',
});

export const Leaderboard = ({ data, activeTournament, onPlayAgain, onTweet, withTopWidget }: LeaderboardProps) => {
  const { sessionPrice, sdkUrl: cdnUrl } = useConfigContext();
  const { address, balance = 0 } = useWalletContext();
  const playerData = useMemo(() => data.find((row) => row.address === address), [data, address]);

  const [handlePlayAgain] = useAsyncCallback(onPlayAgain);

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
      <Alerts>
        <Alert
          title="CONGRATULATIONS"
          subtitle="You have successfully sign up!
Be top-3 player and share a prize"
          skin="signUp"
        />
        <Alert title="Achivement unlocked" subtitle="NeWBIE way" skin="wallet" />
      </Alerts>
      {withTopWidget && (
        <TopWidget
          hasActiveTournament={Boolean(activeTournament)}
          tournamentTitle={`${activeTournament ? activeTournament.title : 'Weekly tournament'}`}
          tournamentSubtitle={activeTournament ? activeTournament.subtitle : 'TOP 20 WINS UNIQUE NFT'}
          amountOfDaysLeft={dayDifference ? dayDifference : 1}
          onPlayAgain={handlePlayAgain}
          onTweet={onTweet}
          disabled={balance < sessionPrice}
          score={playerData?.score}
          rank={playerData?.rank}
        />
      )}
      <ModalWrapper layer={`${cdnUrl}/assets/layer.svg`}>
        <RadialGradientBackGround />
        <Content>
          {playerData && (
            <Stack direction="row" spacing="space-between">
              <LeaderboardTitle>leaderboard</LeaderboardTitle>
              <Address>
                <Truncate text={playerData.address} maxLength={8} />
              </Address>
            </Stack>
          )}
          {!playerData && (
            <Stack align="center">
              <SignUpButton onClick={handlePlayAgain}>Sign up & reveal your rank</SignUpButton>
            </Stack>
          )}
          <Table data={data} activeAddress={address} hasTournament={Boolean(activeTournament)} />
        </Content>
      </ModalWrapper>
    </>
  );
};
