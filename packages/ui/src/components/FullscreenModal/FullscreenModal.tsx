import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

import { Spinner, Stack } from '../index';
import { CloseIcon } from '../../icons';
import { FullScreenBackDrop } from '../FullScreenBackDrop';

export type FullscreenModalProps = PropsWithChildren<{
  hasClose?: boolean;
  isLeaderBoard?: boolean;
  loading?: boolean;
  onRequestClose?: () => void;
  withTopWidget?: boolean;
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
  borderRadius: theme.borderRadius(3),
  padding: theme.spacing(3, 3, 6, 3),
  margin: theme.spacing(4),

  '@media (max-width: 600px)': {
    width: 'auto',
    padding: theme.spacing(2),
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
  return (
    <FullScreenBackDrop>
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'inherit' }}>
          <Spinner size={40} />
        </div>
      ) : (
        <>
          <Content isLeaderBoard={isLeaderBoard}>
            {hasClose && (
              <Header direction="row" spacing={2}>
                <Close onClick={onRequestClose} />
              </Header>
            )}
            {children}
          </Content>
        </>
      )}
    </FullScreenBackDrop>
  );
};
