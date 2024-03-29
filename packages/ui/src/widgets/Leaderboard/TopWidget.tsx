import styled from '@emotion/styled';
import { useCallback } from 'react';

import { ModalWrapper, RadialGradientBackGround, Content, Typography, Button, PlayAgainButton } from '../../components';
import { useConfigContext, useGameInfo, useWalletContext } from '../../hooks';
import { TwitterIcon } from '../../icons';
import { TournamentImagesType } from './Leaderboard';
import { SingleCup } from './SingleCup';

type TopWidgetProps = {
  amountOfDaysLeft?: number;
  onPlayAgain: () => void;
  disabled?: boolean;
  tournamentTitle: string;
  tournamentSubtitle: string;
  tournamentImages?: TournamentImagesType[];
  hasActiveTournament?: boolean;
  onTweet?: (score: number) => Promise<{ tweetBody: string }>;
  score?: number;
  rank?: number;
  currentScore?: number;
};

const WidgetWrapper = styled(ModalWrapper)(({ tournament }: { tournament?: boolean }) => ({
  padding: '36px 24px 32px 24px',
  width: 490,
  minHeight: 265,
  '@media (max-width: 600px)': {
    width: 'auto',
    maxHeight: tournament ? '100%' : 'auto',
  },
}));

const DaysLeft = styled.div(({ tournament }: { tournament?: boolean }) => ({
  padding: '7px 15px 7px 32px',
  background: 'rgba(133, 70, 183, 1)',
  fontFamily: 'Yapari-SemiBold',
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 14,
  whiteSpace: 'nowrap',
  display: 'none',
  textAlign: 'center',
  minWidth: 168,
  textTransform: 'uppercase',
  ...(tournament
    ? {
        padding: '7px 15px',
        display: 'block',
        width: '151px',
        margin: '4px auto 14px auto',
      }
    : {}),
  '@media (max-width: 600px)': {
    left: tournament ? '0px' : '-30px',
  },
}));

const Text = styled.div({
  marginTop: 81,
  maxWidth: 285,
  maxHeight: 88,
  '@media (max-width: 600px)': {
    marginTop: 73,
  },
});

const UniqueNFT = styled(Typography)(({ tournament }: { tournament?: boolean }) => ({
  fontFamily: 'Yapari-SemiBold',
  fontWeight: 600,
  fontSize: 24,
  ...(tournament && {
    textTransform: 'uppercase',
  }),
  '@media (max-width: 600px)': {
    width: 287,
    fontSize: 19,
    margin: '0 auto',
  },
}));

const TweetButton = styled(Button)(({ tournament }: { tournament?: boolean }) => ({
  background: 'transparent',
  marginTop: tournament ? '20px!important' : '37px!important',
  border: '1px solid #FFFFFF',
  height: 36,
  minHeight: 36,
  fontSize: 14,
  fontWeight: '22px',
  borderRadius: 4,
  '& > div': {
    padding: '0 6px',
    ...(tournament && {
      whiteSpace: 'nowrap',
    }),
  },
  ...(tournament && {
    '@media (max-width: 600px)': {
      marginTop: '14px!important',
    },
  }),
}));

const GamePortalButton = styled(Typography)(({ tournament }: { tournament?: boolean }) => ({
  cursor: 'pointer', // TODO remove via ternary
  width: 'auto',
  textAlign: 'center',
  marginTop: '11px',
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '12px',
  lineHeight: '15px',
  fontWeight: 400,
  ...(tournament && {
    margin: '12px auto 0 auto',
  }),
  '@media (max-width: 400px)': {
    marginTop: 9,
  },
}));

const NFTImage = styled.img({
  position: 'absolute',
  width: 180,
  height: 280,
  right: '-60px',
  top: '-110px',
  '@media (max-width: 400px)': {
    width: 156,
    height: 243,
    right: '-50px',
    top: '-80px',
  },
});

const RewardsRow = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  columnGap: '20px',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '14px',
  marginBottom: '20px',
  '& > div': {
    justifySelf: 'center',
  },
});

const RewardColumn = styled.div({
  display: 'grid',
  textAlign: 'center',
  '& > span:first-child': {
    fontSize: '16px',
    lineHeight: '20px',
    marginBottom: '12px',
  },
  '& > span:last-child': {
    fontFamily: 'Yapari-SemiBold',
    fontSize: '16px',
    lineHeight: '19.2px',
    marginTop: '19px',
    letterSpacing: '4%',
  },
});

const Row = styled.div(({ columns, columnGap, justify }: { columns: string; columnGap: number; justify?: string }) => ({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: columns,
  columnGap,
  alignItems: 'center',
  justifyContent: justify,
}));

const Rank = styled.span({
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '14px',
  padding: '6px 8px',
  background: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '8px',
  marginLeft: '4px',
});

export const TopWidget = ({
  hasActiveTournament = false,
  amountOfDaysLeft = 1,
  onPlayAgain,
  tournamentTitle,
  tournamentSubtitle,
  onTweet,
  score,
  rank,
  currentScore,
  tournamentImages,
}: TopWidgetProps): JSX.Element => {
  const { sdkUrl: cdnUrl, gamePortalUrl } = useConfigContext();
  const { address, isReady } = useWalletContext();
  const gameInfo = useGameInfo();

  const handleOpenGamePortal = useCallback(() => {
    window.open(gamePortalUrl, '_blank')?.focus();
  }, [gamePortalUrl]);

  const handleShareClick = useCallback(async () => {
    await onTweet?.(score as number);
    const tweetBody = `text=Do you think you can beat my ${
      gameInfo.name
    } high-score?%0a%0a${address}%0a%0aMy score: ${score}%0a%0aPlay it straight from your browser here: ${
      window.location.origin + window.location.pathname + '?utm=ref_tweet'
    }%0a%0a&hashtags=${gameInfo.tags ? gameInfo.tags.join(',') : 'web3,gamer'}`;
    window.open(`https://twitter.com/intent/tweet?${tweetBody}`, '_system', 'width=600,height=600');
  }, [address, gameInfo.name, gameInfo.tags, onTweet, score]);

  const pluralizeWord = (singularWord: string, pluralWord: string, count: number) => {
    return count > 1 || count === 0 ? pluralWord : singularWord;
  };

  const places: string[] = ['1st prize', '2nd prize', '3rd prize'];
  const mainImage = tournamentImages?.find((image) => image.mainImage);

  return (
    <WidgetWrapper layer={`${cdnUrl}/assets/layer.svg`} padding={[3, 3, 3, 3]} tournament={hasActiveTournament}>
      <RadialGradientBackGround />
      <Content>
        {tournamentImages?.length === 0 || mainImage ? (
          <SingleCup
            tournamentSubtitle={tournamentSubtitle}
            tournamentTitle={tournamentTitle}
            handleOpenGamePortal={handleOpenGamePortal}
            handleShareClick={handleShareClick}
            onPlayAgain={onPlayAgain}
            daysLeft={` ${amountOfDaysLeft} ${pluralizeWord('day', 'days', amountOfDaysLeft)} left`}
            mainImage={mainImage}
          />
        ) : (
          <>
            <UniqueNFT align="center" tournament>
              {amountOfDaysLeft === 0 ? 'Sorry, this tournament is over' : tournamentSubtitle}
            </UniqueNFT>
            <Typography align="center">
              {amountOfDaysLeft === 0 ? 'Keep playing to practice for the next one' : tournamentTitle}
            </Typography>
            <DaysLeft tournament={hasActiveTournament}>
              {amountOfDaysLeft} {pluralizeWord('day', 'days', amountOfDaysLeft)} left
            </DaysLeft>
            <RewardsRow>
              {tournamentImages?.map(({ path }, index) => (
                <RewardColumn key={index}>
                  <span>{places[index]}</span>
                  {/*TODO ask about size and alt text*/}
                  <img src={path} width="100%" height="auto" alt={places[index]} />
                </RewardColumn>
              ))}
            </RewardsRow>
            {!address && currentScore && (
              <Typography align="center">
                Your score <Rank>{currentScore}</Rank>
              </Typography>
            )}
            {rank && (
              <Typography align="center">
                Your rank <Rank>{rank}</Rank>
              </Typography>
            )}
            {address && (
              <Row columns={'auto 130px'} columnGap={6} justify="center">
                <PlayAgainButton
                  onPlayAgain={onPlayAgain}
                  tournament={hasActiveTournament}
                  playAgainText="Play Again"
                />
                <TweetButton
                  tournament={hasActiveTournament}
                  disabled={!isReady || !address}
                  icon={<TwitterIcon color="#FFF" />}
                  variant="outlined"
                  onClick={handleShareClick}
                >
                  Share
                </TweetButton>
              </Row>
            )}
            <GamePortalButton tournament={hasActiveTournament} onClick={address ? handleOpenGamePortal : () => null}>
              {address ? 'Go to Cere game portal →' : 'Was your score good enough to win? Sign up to see'}
            </GamePortalButton>
          </>
        )}
      </Content>
    </WidgetWrapper>
  );
};
