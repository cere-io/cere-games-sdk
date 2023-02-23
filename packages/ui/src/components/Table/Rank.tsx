import styled from '@emotion/styled';

type RankColor = 'gold' | 'silver' | 'bronze';

export type RankProps = {
  rankColor?: RankColor;
};

const rankBackgrounds: Record<RankColor, string> = {
  gold: 'linear-gradient(213.03deg, #F4BB7F -0.52%, #FFD4A7 48.4%, #F4BB7F 98.36%), rgba(255, 255, 255, 0.1)',
  silver:
    'linear-gradient(211.83deg, #ABABAB -0.61%, #DCDCDC 49.12%, #ABABAB 96.81%), linear-gradient(79.06deg, #E34DC5 0%, #9227E3 100%), rgba(255, 255, 255, 0.1)',
  bronze: 'linear-gradient(207.49deg, #C7775D 4.28%, #FFBDA8 50.23%, #C7775D 94.3%), rgba(255, 255, 255, 0.1)',
};

export const Rank = styled.div<RankProps>(({ theme, rankColor }) => ({
  ...theme.typography.body2,
  fontWeight: theme.typography.fontWeight.bold,
  borderRadius: theme.borderRadius(2),
  padding: theme.spacing(0, 1),

  lineHeight: 2.1,
  minWidth: 32,
  textAlign: 'center',

  background: rankColor ? rankBackgrounds[rankColor] : 'rgba(255, 255, 255, 0.2)',
  color: rankColor ? '#000000' : theme.palette.text.primary,
}));
