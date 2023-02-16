import { useMemo, useState } from 'react';
import { GamesSDK } from '@cere/games-sdk';
import { Card, CardContent, CardHeader } from '@mui/material';

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

  return (
    <Layout>
      <Layout.Section title="Bootstrap">
        <AsyncButton onClick={() => sdk.init()}>Init SDK</AsyncButton>
      </Layout.Section>

      {ready && (
        <Layout.Section title="Actions">
          <AsyncButton onClick={() => sdk.showPreloader()}>Show Preloader</AsyncButton>
        </Layout.Section>
      )}

      {ready && (
        <Layout.Section title="Widgets">
          <Card variant="outlined">
            <CardHeader title="Preloader" />
            <CardContent>
              <div
                dangerouslySetInnerHTML={{
                  __html: '<cere-preloader></cere-preloader>',
                }}
              />
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader title="Leader Board" />
            <CardContent>
              <div
                dangerouslySetInnerHTML={{
                  __html: '<cere-leaderboard></cere-leaderboard>',
                }}
              />
            </CardContent>
          </Card>
        </Layout.Section>
      )}
    </Layout>
  );
};
