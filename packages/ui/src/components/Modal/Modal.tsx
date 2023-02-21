import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

import { Backdrop } from '../Backdrop';

type ModalProps = PropsWithChildren<{
  maxWidth?: number;
}>;

const Content = styled.div<ModalProps>(({ theme }) => ({
  background: 'linear-gradient(180deg, rgba(138, 143, 255, 0.2) 0%, rgba(17, 21, 35, 0) 100%), #111523',
  boxShadow: '0px 5px 40px rgba(0, 0, 0, 0.4)',
  borderRadius: theme.borderRadius(5),
  padding: theme.spacing(4),
}));

export const Modal = ({ children, maxWidth = 450 }: ModalProps) => (
  <Backdrop>
    <Content style={{ maxWidth }}>{children}</Content>
  </Backdrop>
);
