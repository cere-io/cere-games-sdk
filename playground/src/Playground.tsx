import { useCallback, useMemo, useState } from 'react';
import { GamesSDK } from '@cere/games-sdk';

import { Layout, AsyncButton } from './components';

export const Playground = () => {
  const [ready, setReady] = useState(false);

  const sdk = useMemo(
    () =>
      new GamesSDK({
        env: 'dev',
        gameId: 'games-sdk-playground',
        onReady: () => setReady(true),
      }),
    [],
  );

  const handleShowPreloader = useCallback(async () => {
    const preloader = sdk.showPreloader({
      onStart() {
        console.log('Preloader: onStart');
      },
    });

    setTimeout(preloader.setReady, 2000);
  }, [sdk]);

  const handleShowLeaderboard = useCallback(async () => {
    sdk.showLeaderboard();
  }, [sdk]);

  const handleConnectWallet = useCallback(async () => {
    await sdk.showConnectWallet({
      score: 25,
      onConnect: () => new Promise((resolve) => setTimeout(resolve, 1000)),
    });
  }, [sdk]);

  const handleSaveScore = useCallback(async () => {
    await sdk.saveScore(25);

    sdk.showLeaderboard();
  }, [sdk]);

  return (
    <Layout>
      <Layout.Section title="Bootstrap">
        <AsyncButton disabled={ready} onClick={() => sdk.init()}>
          Init SDK
        </AsyncButton>
      </Layout.Section>

      {ready && (
        <Layout.Section title="Actions">
          <AsyncButton onClick={handleShowPreloader}>Show Preloader</AsyncButton>
          <AsyncButton onClick={handleShowLeaderboard}>Show Leaderboard</AsyncButton>
          <AsyncButton onClick={handleConnectWallet}>Connect Wallet</AsyncButton>
          <AsyncButton onClick={handleSaveScore}>Save Score & Show Leaderboard</AsyncButton>
        </Layout.Section>
      )}
    </Layout>
  );
};
