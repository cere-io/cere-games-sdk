import styled from '@emotion/styled';

import { Button, PlayAgainButton, Typography } from '../../components';
import { TwitterIcon } from '../../icons';
import { useConfigContext } from '../../hooks';
import { TournamentImagesType } from './Leaderboard';

type SingleCupProps = {
  tournamentTitle: string;
  tournamentSubtitle: string;
  handleOpenGamePortal: () => void;
  handleShareClick: () => void;
  onPlayAgain: () => void;
  daysLeft: string;
  mainImage?: TournamentImagesType | undefined;
};

const Container = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '49px',
});

const SubTitle = styled(Typography)({
  fontSize: '16px',
  '@media (max-width: 600px)': {
    fontSize: '14px',
  },
});

const Title = styled(Typography)({
  fontSize: '24px',
  fontFamily: 'Yapari-SemiBold',
  '@media (max-width: 600px)': {
    fontSize: '16px',
  },
});

const Buttons = styled.div({
  display: 'flex',
});

const DaysLeft = styled.div({
  position: 'absolute',
  padding: '7px 15px 7px 32px',
  background: 'rgba(133, 70, 183, 1)',
  fontFamily: 'Yapari-SemiBold',
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 14,
  top: -69,
  left: -35,
  whiteSpace: 'nowrap',
  display: 'block',
  textAlign: 'center',
  minWidth: 168,
  textTransform: 'uppercase',
  '@media (max-width: 600px)': {
    top: -50,
  },
});

export const CereGamePortal = styled(Typography)(({ tournament }: { tournament?: boolean }) => ({
  cursor: 'pointer',
  width: 'auto',
  textAlign: 'left',
  marginTop: '11px',
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '12px',
  lineHeight: '15px',
  fontWeight: 400,
  ...(tournament && {
    margin: '12px auto 0 auto',
  }),
  '@media (max-width: 400px)': {
    marginTop: 9,
  },
}));

export const CereTweetButton = styled(Button)(({ tournament }: { tournament?: boolean }) => ({
  background: 'transparent',
  marginTop: '37px!important',
  marginLeft: 8,
  border: '1px solid #FFFFFF',
  height: 36,
  minHeight: 36,
  maxWidth: 99,
  fontSize: 14,
  fontWeight: '22px',
  borderRadius: 4,
  '& > div': {
    padding: '0 6px',
    ...(tournament && {
      whiteSpace: 'nowrap',
    }),
  },
  ...(tournament && {
    '@media (max-width: 600px)': {
      marginTop: '14px!important',
    },
  }),
}));

const Image = styled.img({
  width: '139px',
  height: '164px',
  '@media (max-width: 600px)': {
    objectFit: 'contain',
  },
});

export const SingleCup = ({
  tournamentTitle,
  tournamentSubtitle,
  handleOpenGamePortal,
  handleShareClick,
  onPlayAgain,
  daysLeft,
  mainImage,
}: SingleCupProps) => {
  const { sdkUrl: cdnUrl } = useConfigContext();
  return (
    <>
      <Container>
        <DaysLeft>{daysLeft}</DaysLeft>
        <div>
          <SubTitle>{tournamentSubtitle}</SubTitle>
          <Title>{tournamentTitle}</Title>
          <Buttons>
            <PlayAgainButton onPlayAgain={onPlayAgain} tournament={false} playAgainText="Play Again" />
            <CereTweetButton icon={<TwitterIcon color="#FFF" />} variant="outlined" onClick={handleShareClick}>
              Share
            </CereTweetButton>
          </Buttons>
          <CereGamePortal onClick={handleOpenGamePortal}>Go to Cere game portal →</CereGamePortal>
        </div>
        {mainImage ? (
          <Image src={mainImage.path} alt="cup" />
        ) : (
          <Image src={`${cdnUrl}/assets/red-cup.png`} alt="cup" />
        )}
      </Container>
    </>
  );
};
