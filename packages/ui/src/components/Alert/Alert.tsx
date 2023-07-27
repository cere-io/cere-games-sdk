import styled from '@emotion/styled';
import { useId, useState } from 'react';

import { Typography } from '../Typography';
import { CloseIcon } from '../../icons';
import { useConfigContext, useWalletContext, useMediaQuery } from '../../hooks';

const Container = styled.div<{ visible: boolean }>(
  {
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
  },
  ({ visible }) => ({
    visibility: visible ? 'visible' : 'hidden',
  }),
);

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

export const Alert = () => {
  const descriptionId = useId();
  const { sdkUrl: cdnUrl } = useConfigContext();
  const { balance, isNewUser } = useWalletContext();
  const [visible, setVisibility] = useState(true);
  const isMobile = useMediaQuery('(max-width: 600px)');

  if (!visible || !balance || !isNewUser || isMobile) {
    return null;
  }

  return (
    <Container role="alert" aria-describedby={descriptionId} visible={visible}>
      <StyledImage src={`${cdnUrl}/assets/alert.png`} />
      <TextContainer>
        <Title id={descriptionId} variant="body2">
          Achivement unlocked
        </Title>
        <SubTitle id={descriptionId} variant="body2">
          NeWBIE way
        </SubTitle>
      </TextContainer>
      <CloseIconWrapper
        onClick={() => {
          setVisibility(false);
        }}
      >
        <CloseAlert aria-label="Close" />
      </CloseIconWrapper>
    </Container>
  );
};
