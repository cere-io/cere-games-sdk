import { CereGamesSDK } from '@cere/games-sdk';

export const Playground = () => {
  const sdk = new CereGamesSDK();

  return <div>Playground ({sdk.name})</div>;
};
