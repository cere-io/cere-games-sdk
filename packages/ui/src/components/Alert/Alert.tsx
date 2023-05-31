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
  gridTemplateColumns: '32px auto 32px',
  columnGap: 12,
  alignItems: 'center',
  padding: '12px 16px',
  background: '#ffffff',
  boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: 12,
  '& > span': {
    fontSize: 32,
  },

  '@media (max-width: 600px)': {
    top: 0,
    right: 0,
    width: '100%',
  },
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
  const { newWalletReward } = useConfigContext();
  const { balance, isNewUser } = useWalletContext();
  const [visible, setVisibility] = useState(true);

  if (!visible || !balance || !isNewUser) {
    return null;
  }

  return (
    <Container role="alert" aria-describedby={descriptionId}>
      <span>🎉</span>
      <StyledTypography id={descriptionId} variant="body2" color="text-primary">
        You received <b>{newWalletReward} $CERE</b> tokens for setting up your wallet!
      </StyledTypography>
      <CloseAlert aria-label="Close" onClick={() => setVisibility(false)} />
      <ProgressContainer>
        <ProgressBar onAnimationEnd={() => setVisibility(false)} />
      </ProgressContainer>
    </Container>
  );
};
