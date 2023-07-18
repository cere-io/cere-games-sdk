import React, { SVGProps } from "react";

import styled from '@emotion/styled';
import { Button, Stack, Typography } from '../../components';
import { useAsyncCallback } from '../../hooks';
import { BalanceIcon, TrophyRedIcon, GameIcon, LockIcon } from "../../icons";

export type SignUpProps = {
  onConnect?: () => void;
}

type Ads = {
  icon: (props?: SVGProps<SVGSVGElement>) => JSX.Element;
  text: string;
};

const mockAds: Ads[] = [
  {
    icon: BalanceIcon,
    text: 'Your Balance'
  },
  {
    icon: TrophyRedIcon,
    text: 'Weekly tournaments'
  },
  {
    icon: GameIcon,
    text: 'New Games'
  },
]

const Widget = styled(Stack)({
  maxWidth: 400,
  minHeight: 340,

  '@media (min-width: 600px)': {
    minWidth: 441,
    maxHeight: 340,
  },
});

const SignUpButton = styled(Button)({
  marginTop: 'auto',
  borderRadius: 4,
  background: '#F32758',
});

const Title = styled(Typography)({
  color: '#FFF',
  fontFamily: 'Yapari-SemiBold',
  fontSize: 28,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: '0.28px',
  width: 393,
});

const SignUpAds = styled.div({
  borderRadius: 12,
  background: 'rgba(233, 204, 255, 0.10)',
  display: 'flex',
  width: 393,
  height: 143,
  justifyContent: "space-between",
  padding: '20px 53px 19px 53px',
  margin: '14px 0 0 0'
});

const AdElement = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  width: 58,
  height: 110,
});

const AdText = styled(Typography)({
  fontFamily: 'Lexend, sans-serif',
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: '0.01em',
  marginTop: 6,

});

const AdIcon = styled.div({
  maxHeight: 42,
  marginTop: 10,
});

const ConnectWallet = styled.div({
  marginTop: 14,
});

export const SignUp = ({ onConnect }: SignUpProps) => {
  const [handleStartClick, isBusy] = useAsyncCallback(onConnect);

  return (
    <Widget align="center">
      <Title align="center" uppercase>
        Don’t Lose
        your progress
      </Title>
      <SignUpAds>
        {mockAds.map(({ icon: Icon, text }: Ads, index: number) => {
          return (
            <AdElement  direction="column" key={index}>
            <LockIcon />
              <AdIcon>
                <Icon />
              </AdIcon>
              <AdText align="center">
                {text}
              </AdText>
            </AdElement>
          )
        })}
      </SignUpAds>
      <ConnectWallet>
        Connect your wallet and save your result
      </ConnectWallet>
      <SignUpButton onClick={handleStartClick}>
        Sign Up
      </SignUpButton>
    </Widget>
  );
};
