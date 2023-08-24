import styled from '@emotion/styled';
import { useCallback } from 'react';

import { ModalWrapper, RadialGradientBackGround, Content, Typography, Button } from '../../components';
import { useConfigContext, useWalletContext } from '../../hooks';
import { RepeatIcon, TwitterIcon } from '../../icons';

type TopWidgetProps = {
  amountOfDaysLeft?: number;
  onPlayAgain: () => void;
  disabled?: boolean;
  tournamentTitle: string;
  onTweet?: (score: number) => Promise<{ tweetBody: string }>;
  score?: number;
};

const WidgetWrapper = styled(ModalWrapper)({
  width: 490,
  minHeight: 265,
  '@media (max-width: 600px)': {
    width: 'auto',
    maxHeight: 325,
  },
});

const DaysLeft = styled.div({
  padding: '7px 15px 7px 32px',
  background: 'rgba(133, 70, 183, 1)',
  fontFamily: 'Yapari-SemiBold',
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 14,
  textAlign: 'center',
  position: 'absolute',
  left: '-30px',
  top: '-80px',
  minWidth: 168,
  textTransform: 'uppercase',
  '@media (max-width: 600px)': {
    left: '-30px',
  },
});

const Text = styled.div({
  marginTop: 81,
  maxWidth: 285,
  maxHeight: 88,
  '@media (max-width: 600px)': {
    marginTop: 73,
  },
});

const UniqueNFT = styled(Typography)({
  fontFamily: 'Yapari-SemiBold',
  fontWeight: 600,
  fontSize: 24,
  '@media (max-width: 600px)': {
    width: 186,
    height: 72,
    fontSize: 19,
  },
});

const PlayAgain = styled(Button)({
  marginTop: '37px!important',
  maxWidth: 146,
  height: 36,
  minHeight: 36,
  fontSize: 14,
  fontWeight: '24px',
  borderRadius: 4,
  padding: 0,
  background: 'rgba(243, 39, 88, 1)',
});

const PlayAgainText = styled(Typography)({
  marginLeft: 6,
  fontSize: 14,
});

const TweetButton = styled(Button)({
  background: 'transparent',
  marginTop: '37px!important',
  border: '1px solid #FFFFFF',
  height: 36,
  minHeight: 36,
  fontSize: 14,
  fontWeight: '22px',
  borderRadius: 4,
  '& > div': {
    padding: '0 6px',
  },
});

const GamePortalButton = styled(Typography)({
  cursor: 'pointer',
  marginTop: '11px',
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '12px',
  lineHeight: '15px',
  fontWeight: 400,
  textDecoration: 'underline',
});

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

const Row = styled.div(({ columns, columnGap }: { columns: string; columnGap: number }) => ({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: columns,
  columnGap,
  alignItems: 'center',
}));

export const TopWidget = ({
  amountOfDaysLeft = 1,
  onPlayAgain,
  tournamentTitle,
  onTweet,
  score,
}: TopWidgetProps): JSX.Element => {
  const { sdkUrl: cdnUrl, gamePortalUrl } = useConfigContext();
  const { address, isReady } = useWalletContext();

  const handleOpenGamePortal = useCallback(() => {
    window.open(gamePortalUrl, '_blank')?.focus();
  }, [gamePortalUrl]);

  const handleShareClick = useCallback(async () => {
    const tweet = await onTweet?.(score as number);
    window.open(`https://twitter.com/intent/tweet?${tweet?.tweetBody}`, '_system', 'width=600,height=600');
  }, [onTweet, score]);

  return (
    <WidgetWrapper layer={`${cdnUrl}/assets/layer.svg`} padding={[3, 3, 3, 3]}>
      <RadialGradientBackGround />
      <Content>
        <DaysLeft>{amountOfDaysLeft} day left</DaysLeft>
        <NFTImage src={`${cdnUrl}/assets/nft.png`} />
        <Text>
          <Typography>{tournamentTitle}</Typography>
          <UniqueNFT>TOP 20 WINS UNIQUE NFT</UniqueNFT>
        </Text>
        <Row columns={'146px 99px'} columnGap={8}>
          <PlayAgain onClick={onPlayAgain}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <RepeatIcon />
              <PlayAgainText>Play Again</PlayAgainText>
            </div>
          </PlayAgain>
          <TweetButton
            disabled={!isReady || !address}
            icon={<TwitterIcon color="#FFF" />}
            variant="outlined"
            onClick={handleShareClick}
          >
            Tweet
          </TweetButton>
        </Row>
        <GamePortalButton onClick={handleOpenGamePortal}>Go to Cere game portal →</GamePortalButton>
      </Content>
    </WidgetWrapper>
  );
};
