import styled from '@emotion/styled';
import { ModalWrapper, RadialGradientBackGround, Content, Typography, Button } from '../../components';
import { nft } from '../../assets';
import { RepeatIcon } from '../../icons';

type TopWidgetProps = {
  amountOfDaysLeft?: number;
  onPlayAgain: () => void;
  disabled?: boolean;
};

const WidgetWrapper = styled(ModalWrapper)({
  minWidth: 443,
  minHeight: 265,
});

const DaysLeft = styled.div({
  padding: '7px 15px',
  background: 'rgba(133, 70, 183, 1)',
  fontFamily: 'Yapari-SemiBold',
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 14,
  textAlign: 'center',
  position: 'absolute',
  left: '-40px',
  top: '-80px',
  minWidth: 168,
  textTransform: 'uppercase',
});

const Text = styled.div({
  marginTop: 81,
  maxWidth: 285,
  maxHeight: 88,
});

const UniqueNFT = styled(Typography)({
  fontFamily: 'Yapari-SemiBold',
  fontWeight: 600,
  fontSize: 24,
});

const PlayAgain = styled(Button)({
  marginTop: '37px!important',
  maxWidth: 146,
  height: 36,
  minHeight: 36,
  fontSize: 20,
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
});

export const TopWidget = ({ amountOfDaysLeft = 1, onPlayAgain, disabled }: TopWidgetProps): JSX.Element => {
  return (
    <WidgetWrapper>
      <RadialGradientBackGround />
      <Content>
        <DaysLeft>{amountOfDaysLeft} day left</DaysLeft>
        <NFTImage src={nft} />
        <Text>
          <Typography>Weekly tournament</Typography>
          <UniqueNFT>TOP 20 wins UNIQUE NFT</UniqueNFT>
        </Text>
        <PlayAgain onClick={disabled ? () => onPlayAgain : () => null}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <RepeatIcon />
            <PlayAgainText>Play Again</PlayAgainText>
          </div>
        </PlayAgain>
      </Content>
    </WidgetWrapper>
  );
};
