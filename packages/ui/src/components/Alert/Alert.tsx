import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { Typography } from '../Typography';
import { CloseIcon } from '../../icons';

const Container = styled.div({
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
    position: 'relative',
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
  maxWidth: 207,
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
const ProgressBar = styled.div(({ width }: { width: number }) => ({
  display: 'block',
  width: `${width}%`,
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

let interval: NodeJS.Timer | undefined = undefined;

export const Alert = () => {
  const [visible, setVisibility] = useState(true);
  const [width, setWidth] = useState(1);

  useEffect(() => {
    if (visible) {
      interval = setInterval(() => {
        setWidth((prev) => prev + 1);
      }, 50);
    } else {
      clearInterval(interval);
    }
  }, [visible]);

  useEffect(() => {
    if (width === 100) {
      setVisibility(false);
      clearInterval(interval);
    }
  }, [width]);

  if (!visible) {
    return null;
  }
  return (
    <Container>
      <span>🎉</span>
      <StyledTypography variant="body2" color="text-primary">
        You received <b>20 CERE</b> tokens for setting up your wallet!
      </StyledTypography>
      <CloseAlert onClick={() => setVisibility(false)} />
      <ProgressContainer>
        <ProgressBar width={width} />
      </ProgressContainer>
    </Container>
  );
};
