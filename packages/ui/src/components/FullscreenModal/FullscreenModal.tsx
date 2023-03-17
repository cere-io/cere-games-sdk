import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

import { Spinner, Stack } from '../index';
import { CloseIcon } from '../../icons';
import { FullScreenBackDrop } from '../FullScreenBackDrop';
import { useImagePreloader } from '../../hooks';

export type FullscreenModalProps = PropsWithChildren<{
  hasClose?: boolean;
  isLeaderBoard?: boolean;
  loading?: boolean;
  onRequestClose?: () => void;
}>;

const Header = styled(Stack)(({ theme }) => ({
  height: 24,
  position: 'relative',
  marginTop: theme.spacing(-1),

  '@media (max-width: 600px), (max-height: 440px)': {
    marginRight: theme.spacing(1),
  },
}));

const Close = styled(CloseIcon)(({ theme }) => ({
  zIndex: 4,
  color: theme.palette.text.primary,
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(27.1828px)',
  borderRadius: '100px',
  fontSize: 14,
  padding: 7,
  right: -7,
  boxSizing: 'content-box',
  cursor: 'pointer',
  position: 'absolute',
}));

const Content = styled.div<FullscreenModalProps>(({ theme, isLeaderBoard }) => ({
  background: isLeaderBoard
    ? 'linear-gradient(180deg, #3F006B 0%, #111523 100%)'
    : 'linear-gradient(180deg, #5E009F 0%, #111523 100%)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  boxShadow: '0px 5px 40px rgba(0, 0, 0, 0.4)',
  borderRadius: theme.borderRadius(4),
  padding: theme.spacing(4),
  margin: theme.spacing(4),
  width: 600,

  '@media (max-width: 600px)': {
    width: 'auto',
    padding: theme.spacing(3),
    margin: 0,
    borderRadius: 0,
  },
}));

export const FullscreenModal = ({
  children,
  onRequestClose,
  hasClose = false,
  loading = false,
  isLeaderBoard,
}: FullscreenModalProps) => {
  const { imagesPreloaded } = useImagePreloader([
    'https://assets.cms.freeport.dev.cere.network/animation_640_lf88b7kr_aa5d097cd4.gif',
    'https://assets.cms.freeport.dev.cere.network/crown_image_ceeef25fb4.png',
    'https://assets.cms.freeport.dev.cere.network/gaming_flag_1_c4694198b3.png',
    'https://assets.cms.freeport.dev.cere.network/gaming_flag_2_e9e8b7d37c.png',
    'https://assets.cms.freeport.dev.cere.network/star_trophy_3_f18a9faca7.png',
  ]);

  console.log('leaderBoard', isLeaderBoard);

  return (
    <FullScreenBackDrop>
      {loading || !imagesPreloaded ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'inherit' }}>
          <Spinner size={40} />
        </div>
      ) : (
        <Content isLeaderBoard={isLeaderBoard}>
          {hasClose && (
            <Header direction="row" spacing={2}>
              <Close onClick={onRequestClose} />
            </Header>
          )}
          {children}
        </Content>
      )}
    </FullScreenBackDrop>
  );
};
