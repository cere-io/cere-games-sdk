import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

import { CloseIcon } from '../../icons';
import { layerSvg } from '../../assets'
import { Backdrop } from '../Backdrop';
import { Spinner } from '../Spinner';
import { Stack } from '../Stack';

export type ModalProps = PropsWithChildren<{
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

const Wrapper = styled.div<ModalProps>(({ theme }) => ({
  background: 'linear-gradient(180deg, #010107 23.96%, #2C325B 100%)',
  boxShadow: '0px 5px 40px rgba(0, 0, 0, 0.4)',
  position: 'relative',
  zIndex: 1,
  borderRadius: theme.borderRadius(3),
  padding: `${theme.spacing(3)} ${theme.spacing(3)} ${theme.spacing(4)} ${theme.spacing(3)}`,
  margin: theme.spacing(4),
  '@media (max-width: 600px), (max-height: 440px)': {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  '&:before': {
    content: '""',
    background: `url(${layerSvg})`,
    backgroundSize: 'cover',
    position: 'absolute',
    zIndex: -1,
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    opacity: '0.2'
  }
}));

const RadialGradientBackGround = styled.div(({ theme }) => ({
  background: 'radial-gradient(99.55% 99.55% at 90.53% 50.99%, rgba(22, 29, 48, 0.00) 0%, #161D30 82.04%)',
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 2,
  borderRadius: theme.borderRadius(3),
  padding: `${theme.spacing(3)} ${theme.spacing(3)} ${theme.spacing(4)} ${theme.spacing(3)}`,
  '@media (max-width: 600px), (max-height: 440px)': {
    padding: theme.spacing(2),
  },
}));

const Content = styled.div({
  position: "relative",
  zIndex: 3,
});

export const Modal = ({ children, onRequestClose, hasClose = false, loading = false }: ModalProps) => (
  <Backdrop>
    {loading ? (
      <Spinner size={40} />
    ) : (
      <Wrapper>
        <RadialGradientBackGround />
        {hasClose && (
          <Header direction="row" spacing={2}>
            <Close onClick={onRequestClose} />
          </Header>
        )}
      <Content>
        {children}
      </Content>
      </Wrapper>
    )}
  </Backdrop>
);
