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
  fontSize: 14,
  padding: 7,
  right: -7,
  boxSizing: 'content-box',
  cursor: 'pointer',
  position: 'absolute',
}));

const Content = styled.div<FullscreenModalProps>(({ theme }) => ({
  background:
    'url(https://assets.cms.freeport.dev.cere.network/background_claim_prizes_full_03715eef9b.png), linear-gradient(180deg, rgba(138, 143, 255, 0.2) 0%, rgba(17, 21, 35, 0) 100%), #111523',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  boxShadow: '0px 5px 40px rgba(0, 0, 0, 0.4)',
  borderRadius: theme.borderRadius(5),
  padding: theme.spacing(4),
  margin: theme.spacing(4),

  '@media (max-width: 600px), (max-height: 440px)': {
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
