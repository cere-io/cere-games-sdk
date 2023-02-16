import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

const Backdrop = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Modal = ({ children }: PropsWithChildren<{}>) => <Backdrop>{children}</Backdrop>;
