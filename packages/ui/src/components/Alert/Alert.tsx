import styled from '@emotion/styled';
import { useId, useState } from 'react';
import { keyframes } from '@emotion/react';

import { Typography } from '../Typography';
import { CloseIcon } from '../../icons';
import { useConfigContext, useWalletContext } from '../../hooks';

const Container = styled.div({
  zIndex: 100,
  position: 'absolute',
  right: 39,
  top: 32,
  display: 'grid',
  gridTemplateColumns: 'auto auto 32px',
  columnGap: 12,
  alignItems: 'center',
  padding: '12px 16px',
  background: 'linear-gradient(180deg, #010107 23.96%, #2C325B 100%)',
  boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: 24,
  '& > span': {
    fontSize: 32,
  },

  '@media (max-width: 600px)': {
    top: 0,
    right: 0,
    width: '100%',
  },
});

const CloseIconWrapper = styled.div({
  position: 'absolute',
  top: '-10px',
  right: '-10px',
});

const CloseAlert = styled(CloseIcon)(() => ({
  color: 'rgba(17, 17, 17, 0.5)',
  backdropFilter: 'blur(27.1828px)',
  fontSize: 12,
  padding: '12px 16px',
  boxSizing: 'content-box',
  cursor: 'pointer',
}));

const StyledTypography = styled(Typography)({
  maxWidth: 220,
  '@media (max-width: 600px)': {
    maxWidth: '100%',
  },
});

const ProgressContainer = styled.div({
  position: 'absolute',
  bottom: 0,
  height: 3,
  width: '97%',
  borderRadius: '0 0 12px 12px',
  marginLeft: 6,
  background: '#D6D6D6',
});

const TextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Title = styled(Typography)({
  color: '#FFF',
  fontFamily: 'Lexend',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: 'normal',
});

const StyledImage = styled.img({
  height: 73,
  width: 72,
  objectFit: 'cover',
  borderRadius: 12,
  '@media (max-height: 440px)': {
    height: 130,
  },
});

const SubTitle = styled(Typography)({
  color: '#FFF',
  fontFamily: 'Yapari-SemiBold',
  fontSize: 20,
  fontStyle: 'normal',
  fontWeight: '600',
  lineHeight: 'normal',
  textTransform: 'uppercase',
  marginTop: 4,
});

const ProgressBar = styled.div(() => ({
  animationName: keyframes({
    from: {
      width: 0,
    },

    to: {
      width: '100%',
    },
  }),

  animationDuration: '5s',
  animationIterationCount: 1,
  transitionProperty: 'width',
  animationTimingFunction: 'linear',

  display: 'block',
  width: 0,
  borderRadius: '0 0 12px 12px',
  height: 3,
  background: 'linear-gradient(79.06deg, #E34DC5 0%, #9227E3 100%)',
  position: 'relative',
  '&:after': {
    content: '""',
    zIndex: '1',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
}));

export const Alert = () => {
  const descriptionId = useId();
  const { sdkUrl: cdnUrl } = useConfigContext();
  const { balance, isNewUser } = useWalletContext();
  const [visible, setVisibility] = useState(true);

  if (!visible || !balance || !isNewUser) {
    return null;
  }

  return (
    <Container role="alert" aria-describedby={descriptionId}>
      <StyledImage src={`${cdnUrl}/assets/alert.png`} />
      <TextContainer>
        <Title id={descriptionId} variant="body2">
          Achivement unlocked
        </Title>
        <SubTitle id={descriptionId} variant="body2">
          NeWBIE way
        </SubTitle>
      </TextContainer>
      <CloseIconWrapper>
        <CloseAlert
          aria-label="Close"
          onClick={() => {
            console.log('asdasfd');
            setVisibility(false);
          }}
        />
      </CloseIconWrapper>
    </Container>
  );
};
