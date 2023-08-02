import styled from '@emotion/styled';

import { useConfigContext, useMediaQuery } from '../../hooks';
import { Button, Stack, Typography, ProgressiveImg } from '../../components';

export type EarnScreenProps = {
  onShowSignUp?: () => void;
};

const Connect = styled(Button)({
  fontSize: 16,
  fontWeight: '24px',
  borderRadius: 4,
  background: 'rgba(243, 39, 88, 1)',
});

const Widget = styled(Stack)({
  position: 'relative',
  width: 492,
  '@media (max-width: 600px)': {
    width: 'auto',
    maxWidth: 345,
    height: 'auto',
  },
});

const HeaderTitle = styled(Typography)({
  fontFamily: 'Yapari-SemiBold, sans-serif',
  color: '#FFF',
  fontSize: 28,
  fontStyle: 'normal',
  fontWeight: 600,
  '@media (max-width: 600px)': {
    fontSize: 20,
  },
});

const HeaderSubTitle = styled(HeaderTitle)({
  color: '#FFF',
  textAlign: 'center',
  fontFamily: 'Lexend',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 300,
  lineHeight: '20px',
  width: 300,
  marginTop: 15,
  '@media (max-width: 600px)': {
    width: 'auto',
    maxWidth: 300,
    fontWeight: 200,
    fontSize: '16px',
  },
});

const PlayAgainText = styled(Typography)({
  marginLeft: 12,
  fontSize: 20,
  '@media (max-width: 600px)': {
    fontWeight: 400,
  },
});

const Magnet = styled.div({
  position: 'absolute',
  top: 25,
  left: '-60px',
  width: 125,
  height: 125,
});

const Light = styled.div({
  position: 'absolute',
  top: '150px',
  right: '-60px',
  width: 125,
  height: 125,
});

export const EarnScreen = ({ onShowSignUp }: EarnScreenProps) => {
  const isLandscape = useMediaQuery('(max-height: 440px)');
  const { sdkUrl: cdnUrl, newWalletReward } = useConfigContext();

  return (
    <Widget spacing={isLandscape ? 2 : 4} align="stretch">
      <Magnet>
        <ProgressiveImg src={`${cdnUrl}/assets/dash-run-magnet.png`} width={95} height={94} />
      </Magnet>
      <Light>
        <ProgressiveImg src={`${cdnUrl}/assets/dash-run-light.png`} />
      </Light>
      <ProgressiveImg src={`${cdnUrl}/assets/dash-run-hero.png`} />
      <Stack style={{ zIndex: 2 }}>
        <HeaderTitle role="heading" aria-level={1} align="center" uppercase>
          congratulations!
        </HeaderTitle>
        <HeaderSubTitle role="heading" aria-level={2}>
          You've been awarded {newWalletReward} $CERE tokens. Sign up now and claim your reward!
        </HeaderSubTitle>
      </Stack>
      <Connect onClick={onShowSignUp}>
        <PlayAgainText uppercase={false}>Sign Up</PlayAgainText>
      </Connect>
    </Widget>
  );
};
