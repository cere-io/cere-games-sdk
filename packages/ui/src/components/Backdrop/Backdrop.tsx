import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

export type BackdropProps = PropsWithChildren<{}>;

const Overlay = styled.div({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  WebkitTapHighlightColor: 'transparent',
});

const Content = styled.div({
  flexShrink: 0,
  margin: 'auto',
});

export const Backdrop = ({ children }: BackdropProps) => (
  <Overlay>
    <Content>{children}</Content>
  </Overlay>
);
