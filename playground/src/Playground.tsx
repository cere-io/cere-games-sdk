import { useCallback, useEffect, useMemo, useState } from 'react';
import { GamesSDK } from '@cere/games-sdk';

import { Layout, AsyncButton } from './components';

export const Playground = () => {
  const [ready, setReady] = useState(false);

  const sdk = useMemo(
    () =>
      new GamesSDK({
        env: 'dev',
        gameId: 'metaverse-dash-run',
        gameInfo: {
          name: 'Metaverse Dash Run',
          tags: ['metaversadash', 'web3', 'gamer'],
        },
        onReady: () => setReady(true),
        onWalletDisconnect: () => {
          window.location.reload();
        },
      }),
    [],
  );

  useEffect(() => {
    const logEvent = (event: Event) => console.log('Host window event: ', event.type, event);

    window.addEventListener('focus', logEvent);
    window.addEventListener('blur', logEvent);
    window.addEventListener('focusout', logEvent);
    window.addEventListener('pageHide', logEvent);
    window.addEventListener('pause', logEvent);
    window.addEventListener('focusin', logEvent);
  }, []);

  const handleShowPreloader = useCallback(async () => {
    const preloader = sdk.showPreloader({
      onStart() {
        console.log('Preloader: onStart');
      },
    });

    setTimeout(preloader.setReady, 2000);
  }, [sdk]);

  const handleShowLeaderboard = useCallback(async () => {
    const modal = sdk.showLeaderboard({
      onPlayAgain: () => modal.close(),
    });
  }, [sdk]);

  const handleConnectWallet = useCallback(async () => {
    await sdk.earnScreen({
      score: 25,
      onConnect: () => new Promise((resolve) => setTimeout(resolve, 1000)),
    });
  }, [sdk]);

  const handleSaveScore = useCallback(async () => {
    await sdk.saveScore(25);

    const modal = sdk.showLeaderboard({
      onPlayAgain: () => modal.close(),
      currentScore: 25,
    });
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
