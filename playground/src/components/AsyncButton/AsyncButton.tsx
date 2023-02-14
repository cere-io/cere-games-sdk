import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { useCallback, useState } from 'react';

export type AsyncButtonProps = Omit<LoadingButtonProps, 'onClick' | 'loading'> & {
  onClick?: () => Promise<any>;
};

export const AsyncButton = ({ onClick, ...props }: AsyncButtonProps) => {
  const [loading, setLoading] = useState(false);
  const handleClick = useCallback(async () => {
    setLoading(true);

    try {
      await onClick?.();
    } finally {
      setLoading(false);
    }
  }, [onClick]);

  return <LoadingButton variant="contained" loading={loading} onClick={handleClick} {...props} />;
};
