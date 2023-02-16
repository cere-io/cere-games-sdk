import { useCallback, useMemo } from 'react';
import { GamesSDK } from '@cere/games-sdk';

import { Layout, AsyncButton } from './components';

export const Playground = () => {
  const sdk = useMemo(() => new GamesSDK(), []);

  const handleInit = useCallback(async () => {
    await sdk.init();
  }, [sdk]);

  return (
    <Layout>
      <AsyncButton onClick={handleInit}>Init SDK</AsyncButton>
    </Layout>
  );
};
