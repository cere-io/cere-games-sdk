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
  overflow: 'hidden',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  WebkitTapHighlightColor: 'transparent',
  overscrollBehavior: 'contain',
  zIndex: 999,
});

const Content = styled.div(({ theme }) => ({
  flexShrink: 0,
  margin: 'auto',

  color: theme.palette.text.primary,
}));

export const Backdrop = ({ children }: BackdropProps) => (
  <Overlay>
    <Content>{children}</Content>
  </Overlay>
);
