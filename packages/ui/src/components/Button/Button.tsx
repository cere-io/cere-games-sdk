import styled from '@emotion/styled';
import { ComponentProps, ReactElement } from 'react';

import { Spinner } from '../Spinner';

type ButtonProps = {
  loading?: boolean;
  readOnly?: boolean;
  icon?: ReactElement;
  variant?: 'filled' | 'outlined';
};

const ButtonBase = styled.button<ButtonProps>(
  {
    outline: 'none',
    border: 'none',
    color: '#FFFFFF',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  ({ theme, readOnly, disabled, variant = 'filled' }) => ({
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

    ...(disabled &&
      !readOnly && {
        background: 'rgba(255, 255, 255, 0.1)',
      }),

    cursor: readOnly || disabled ? 'default' : 'pointer',
    padding: theme.spacing(0, 2),
    borderRadius: 100,
  }),
);

const Content = styled.div(({ theme }) => ({
  padding: theme.spacing(0, 2),
}));

export const Button = ({
  loading = false,
  disabled = loading,
  readOnly = false,
  icon,
  children,
  ...props
}: ComponentProps<typeof ButtonBase>) => (
  <ButtonBase {...props} disabled={disabled || readOnly} readOnly={readOnly}>
    {loading ? <Spinner size={25} /> : icon}
    <Content>{children}</Content>
  </ButtonBase>
);
