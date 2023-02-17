import styled from '@emotion/styled';
import { ComponentProps, PropsWithChildren } from 'react';

import { Spinner } from '../Spinner';

const ButtonBase = styled.button(
  {
    background: 'linear-gradient(79.06deg, #E34DC5 0%, #9227E3 100%)',
    outline: 'none',
    border: 'none',
    color: '#FFFFFF',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  ({ theme, disabled }) => ({
    ...theme.typography.button,
    ...(disabled && {
      background: 'rgba(255, 255, 255, 0.1)',
    }),

    borderRadius: 100,
    padding: theme.spacing(0, 2),
  }),
);

export type ButtonProps = PropsWithChildren<ComponentProps<'button'>> & {
  loading?: boolean;
};

const Content = styled.div(({ theme }) => ({
  padding: theme.spacing(0, 1),
}));

export const Button = ({ loading = false, disabled = loading, children, ...props }: ButtonProps) => {
  return (
    <ButtonBase {...props} disabled={disabled}>
      {loading && <Spinner />}
      <Content>{children}</Content>
    </ButtonBase>
  );
};
