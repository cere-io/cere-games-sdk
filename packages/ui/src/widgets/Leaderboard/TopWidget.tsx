import styled from '@emotion/styled';

import { ModalWrapper, RadialGradientBackGround, Content, Typography, Button } from '../../components';
import { useConfigContext } from '../../hooks';
import { RepeatIcon } from '../../icons';

type TopWidgetProps = {
  amountOfDaysLeft?: number;
  onPlayAgain: () => void;
  disabled?: boolean;
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

export const TopWidget = ({ amountOfDaysLeft = 1, onPlayAgain }: TopWidgetProps): JSX.Element => {
  const { sdkUrl: cdnUrl } = useConfigContext();

  return (
    <WidgetWrapper layer={`${cdnUrl}/assets/layer.svg`} padding={[3, 3, 3, 3]}>
      <RadialGradientBackGround />
      <Content>
        <DaysLeft>{amountOfDaysLeft} day left</DaysLeft>
        <NFTImage src={`${cdnUrl}/assets/nft.png`} />
        <Text>
          <Typography>Weekly tournament</Typography>
          <UniqueNFT>TOP 20 WINS UNIQUE NFT</UniqueNFT>
        </Text>
        <PlayAgain onClick={onPlayAgain}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <RepeatIcon />
            <PlayAgainText>Play Again</PlayAgainText>
          </div>
        </PlayAgain>
      </Content>
    </WidgetWrapper>
  );
};
