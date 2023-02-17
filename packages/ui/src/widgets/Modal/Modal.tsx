import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

const Backdrop = styled.div({
  position: 'absolute',
  top: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export type ModalProps = PropsWithChildren<{}>;

export const Modal = ({ children }: ModalProps) => <Backdrop>{children}</Backdrop>;
