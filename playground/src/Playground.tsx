import { useCallback, useMemo, useState } from 'react';
import { GamesSDK } from '@cere/games-sdk';

import { Layout, AsyncButton } from './components';

export const Playground = () => {
  const [ready, setReady] = useState(false);

  const sdk = useMemo(
    () =>
      new GamesSDK({
        onReady: () => setReady(true),
      }),
    [],
  );

  const handleShowPreloader = useCallback(async () => {
    const preloader = await sdk.showPreloader();

    setTimeout(preloader.setReady, 2000);
  }, [sdk]);

  return (
    <Layout>
      <Layout.Section title="Bootstrap">
        <AsyncButton onClick={() => sdk.init()}>Init SDK</AsyncButton>
      </Layout.Section>

      {ready && (
        <Layout.Section title="Actions">
          <AsyncButton onClick={handleShowPreloader}>Show Preloader</AsyncButton>
        </Layout.Section>
      )}
    </Layout>
  );
};
