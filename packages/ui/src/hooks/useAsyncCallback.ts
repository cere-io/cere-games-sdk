import { useCallback, useState } from 'react';

import { useReporting } from './useReporting';

export const useAsyncCallback = <T = void>(callback?: () => Promise<T> | T) => {
  const reporting = useReporting();
  const [busy, setBusy] = useState(false);

  const call = useCallback(async () => {
    try {
      setBusy(true);
      await callback?.();
    } catch (error) {
      reporting.error(error);
    }

    setBusy(false);
  }, [callback, reporting]);

  return [call, busy] as const;
};
