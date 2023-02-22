import styled from '@emotion/styled';
import { ComponentProps, ReactElement } from 'react';

import { Spinner } from '../Spinner';

type ButtonProps = {
  loading?: boolean;
  icon?: ReactElement;
  variant?: 'filled' | 'outlined';
};

const ButtonBase = styled.button<ButtonProps>(
  {
    outline: 'none',
    border: 'none',
    color: '#FFFFFF',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  ({ theme, disabled, variant = 'filled' }) => ({
    ...theme.typography.button,

    ...(variant === 'filled' && {
      background: 'linear-gradient(79.06deg, #E34DC5 0%, #9227E3 100%)',
    }),

    ...(variant === 'outlined' && {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.palette.border,
      background: 'transparent',
    }),

    ...(disabled && {
      cursor: 'default',
      background: 'rgba(255, 255, 255, 0.1)',
    }),

    borderRadius: 100,
    padding: theme.spacing(0, 2),
  }),
);

const Content = styled.div(({ theme }) => ({
  padding: theme.spacing(0, 2),
}));

export const Button = ({
  loading = false,
  disabled = loading,
  icon,
  children,
  ...props
}: ComponentProps<typeof ButtonBase>) => (
  <ButtonBase {...props} disabled={disabled}>
    {loading ? <Spinner /> : icon}
    <Content>{children}</Content>
  </ButtonBase>
);
