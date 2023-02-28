import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

import { CloseIcon } from '../../icons';
import { Backdrop } from '../Backdrop';
import { Stack } from '../Stack';

export type ModalProps = PropsWithChildren<{
  hasClose?: boolean;
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

const Content = styled.div<ModalProps>(({ theme }) => ({
  background: 'linear-gradient(180deg, rgba(138, 143, 255, 0.2) 0%, rgba(17, 21, 35, 0) 100%), #111523',
  boxShadow: '0px 5px 40px rgba(0, 0, 0, 0.4)',
  borderRadius: theme.borderRadius(5),
  padding: theme.spacing(4),
  margin: theme.spacing(4),

  '@media (max-width: 600px), (max-height: 440px)': {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
}));

export const Modal = ({ children, onRequestClose, hasClose = false }: ModalProps) => (
  <Backdrop>
    <Content>
      {hasClose && (
        <Header direction="row" spacing={2}>
          <Close onClick={onRequestClose} />
        </Header>
      )}

      {children}
    </Content>
  </Backdrop>
);
