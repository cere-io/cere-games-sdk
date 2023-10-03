import styled from '@emotion/styled';
import { useId, useState } from 'react';

import { Typography } from '../Typography';
import { CloseIcon } from '../../icons';
import { useConfigContext, useWalletContext, useMediaQuery } from '../../hooks';
import { AlertRewardIcon } from '../../icons/AlertRewardIcon';

const Container = styled.div<{ visible: boolean; skin?: AlertProps['skin'] }>(
  {
    position: 'relative',
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
  ({ skin }) =>
    skin === 'signUp' && {
      width: '322px',
      justifySelf: 'end',
      padding: '24px 20px 20px 20px',
      whiteSpace: 'pre-wrap',
    },
  ({ visible }) => ({
    visibility: visible ? 'visible' : 'hidden',
  }),
);

const CloseIconWrapper = styled.div({
  position: 'absolute',
  top: '11px',
  right: '11px',
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

const Title = styled(Typography)(({ skin }: { skin?: AlertProps['skin'] }) => ({
  color: '#FFF',
  ...(skin === 'wallet'
    ? {
        fontFamily: 'Lexend',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 'normal',
      }
    : {
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'Yapari-SemiBold',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 'normal',
        textTransform: 'uppercase',
        '& > svg': { marginRight: '4px' },
      }),
}));

const StyledImage = styled.img({
  height: 73,
  width: 72,
  objectFit: 'cover',
  borderRadius: 12,
  '@media (max-height: 440px)': {
    height: 130,
  },
});

const SubTitle = styled(Typography)(({ skin }: { skin?: AlertProps['skin'] }) => ({
  color: '#FFF',
  ...(skin === 'wallet'
    ? {
        fontFamily: 'Yapari-SemiBold',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 'normal',
        textTransform: 'uppercase',
      }
    : {
        fontFamily: 'Lexend',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: '17px',
      }),
  marginTop: 4,
}));

const AlertReward = styled(AlertRewardIcon)({
  display: 'inline-block',
});

export type AlertProps = {
  title: string;
  subtitle: string;
  skin: 'wallet' | 'signUp';
};

export const Alert = ({ title, subtitle, skin }: AlertProps) => {
  const descriptionId = useId();
  const { sdkUrl: cdnUrl } = useConfigContext();
  const { balance, isNewUser, address } = useWalletContext();
  const [visible, setVisibility] = useState(true);
  const isMobile = useMediaQuery('(max-width: 600px)');

  if (!visible || (skin === 'wallet' ? !balance || !isNewUser : !address) || isMobile) {
    return null;
  }

  return (
    <Container aria-describedby={descriptionId} visible={visible} skin={skin}>
      {skin !== 'signUp' && <StyledImage src={`${cdnUrl}/assets/alert.png`} />}
      <TextContainer>
        <Title role="alertNotification" id={descriptionId} variant="body2">
          {skin === 'signUp' && <AlertReward />}
          {title}
        </Title>
        <SubTitle id={descriptionId} variant="body2">
          {subtitle}
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
