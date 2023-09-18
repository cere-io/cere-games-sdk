import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

export type FullScreenBackDropProps = PropsWithChildren<{}>;

const Overlay = styled.div({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  overflowX: 'visible',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  WebkitTapHighlightColor: 'transparent',
  overscrollBehavior: 'contain',
  zIndex: 999,
  overflow: 'hidden',
  '@media (max-width: 600px)': {
    overflowY: 'auto',
  },
});

const Content = styled.div(({ theme }) => ({
  flexShrink: 0,
  margin: '7px auto auto',

  color: theme.palette.text.primary,
  '@media (max-width: 600px)': {
    margin: 'auto',
    width: '100%',
    height: '100%',
  },
}));

export const FullScreenBackDrop = ({ children }: FullScreenBackDropProps) => (
  <Overlay>
    <Content>{children}</Content>
  </Overlay>
);
