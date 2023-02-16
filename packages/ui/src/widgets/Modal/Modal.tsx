import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

const Backdrop = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Content = styled.div({
  backgroundColor: '#FFFFFF',
  borderRadius: 8,
  padding: 16,
});

export const Modal = ({ children }: PropsWithChildren<{}>) => (
  <Backdrop>
    <Content>{children}</Content>
  </Backdrop>
);
