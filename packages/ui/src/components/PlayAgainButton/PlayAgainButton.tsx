import styled from '@emotion/styled';
import { Button } from '../Button';
import { Typography } from '../Typography';
import { RepeatIcon } from '../../icons';

type PlayAgainButtonProps = {
  onPlayAgain: () => void;
  tournament: boolean;
  playAgainText: string;
};

export const PlayAgain = styled(Button)(({ tournament }: { tournament?: boolean }) => ({
  marginTop: tournament ? '20px!important' : '37px!important',
  maxWidth: 146,
  height: 36,
  minHeight: 36,
  fontSize: 14,
  fontWeight: '24px',
  borderRadius: 4,
  padding: 0,
  background: 'rgba(243, 39, 88, 1)',
  ...(tournament && {
    whiteSpace: 'nowrap',
    '@media (max-width: 600px)': {
      marginTop: '14px!important',
    },
  }),
}));

export const PlayAgainText = styled(Typography)({
  marginLeft: 6,
  fontSize: 14,
});

export const PlayAgainButton = ({ onPlayAgain, tournament, playAgainText }: PlayAgainButtonProps) => {
  return (
    <PlayAgain onClick={onPlayAgain} tournament={tournament}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RepeatIcon />
        <PlayAgainText>{playAgainText}</PlayAgainText>
      </div>
    </PlayAgain>
  );
};
//Play Again
