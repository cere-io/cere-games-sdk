import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

import { Spinner, Stack } from '../index';
import { CloseIcon } from '../../icons';
import { FullScreenBackDrop } from '../FullScreenBackDrop';

export type FullscreenModalProps = PropsWithChildren<{
  hasClose?: boolean;
  loading?: boolean;
  onRequestClose?: () => void;
}>;

const Header = styled(Stack)(({ theme }) => ({
  height: 24,
  position: 'relative',
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(-1),

  '@media (max-width: 600px), (max-height: 440px)': {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(0),
  },
}));

const Close = styled(CloseIcon)(({ theme }) => ({
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

const Content = styled.div<FullscreenModalProps>(({ theme }) => ({
  background:
    'url(https://assets.cms.freeport.dev.cere.network/confetti_background_min_9df623fb87.png), linear-gradient(180deg, #5E009F 0%, #111523 100%);',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  boxShadow: '0px 5px 40px rgba(0, 0, 0, 0.4)',
  borderRadius: theme.borderRadius(4),
  padding: theme.spacing(4),
  margin: theme.spacing(4),
  width: 600,

  '@media (max-width: 600px), (max-height: 440px)': {
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
}: FullscreenModalProps) => {
  return (
    <FullScreenBackDrop>
      {loading ? (
        <Spinner size={40} />
      ) : (
        <Content>
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
