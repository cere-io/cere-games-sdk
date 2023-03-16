# Cere Games SDK

`Cere Games SDK` is an NPM package which allows a game developer to easily integrate with CERE infrastructure & DDC interaction. The SDK provides methods to fetch/update player score, display UI components based on game settings.

# Installation

Using `NPM`:

```bash
npm install @cere/games-sdk --save
```

Using `yarn`:

```bash
yarn add @cere/games-sdk
```

# API

- [GamesSDK](#embedwallet)
  - [wallet](#wallet)
  - [init()](#init)
  - [showPreloader()](#showpreloader)
  - [showLeaderboard()](#showleaderboard)
  - [showConnectWallet()](#showconnectwallet)
  - [saveScore()](#savescore)

## GamesSDK

The constructor creates uninitialized `SDK` instance

```ts
import { GamesSdk } from '@cere/games-sdk';

const gamesSdk = new GamesSdk({
  env: 'dev',
  gameId: 'tower-game',
  onReady: () => {
    console.log('The SDK is ready!');
  },
});
```

#### Parameters

- `env` - the `SDK` environment. Can be one of the following:
  - `local` - loads all its dependencies from local environment (`localhost`)
  - `dev` - loads all its dependencies from the development environment
  - `stage` - loads all its dependencies from the stage environment
  - `prod` - loads all its dependencies from the production environment
- `gameId` - unique game identifier
- `onReady` - a callback called when the `SDK` is initialized and ready for interactions

### wallet

Pre-configured `Cere Wallet` instance

```ts
// Get wallet accounts
const accounts = await gamesSdk.wallet.getAccounts();

console.log('Connected wallet accounts', accounts);

// Transfer tokens
const txHash = await gamesSdk.wallet.transfer({
  token: 'CERE',
  to: '...',
  amount: 10,
});

console.log('Connected wallet accounts', accounts);
```

### init()

This method initializes the SDK. It also performs the following tasks:

- Registers UI elements ([Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components))
- Configures and initializes `Cere Wallet`
- Calls `onReady` callback

```ts
await gamesSdk.init();
```

### showPreloader()

This method shows `Preloader` modal window which covers entire screen.

```ts
const preloader = gamesSdk.showPreloader({
  onStart: () => {
    // Start the game
  },
});
```

#### Parameters

- `onStart` - a callback which is called when player requests to start the game by clicking on `Start` button

The method returns a preloader modal instance of the following type:

```ts
type Preloader = {
  readonly isOpen: boolean;
  open: () => void;
  close: () => void;
  setReady: (isReady: boolean) => void;
};
```

When the game logic should call `setReady` method when its assets are fully loaded. It will enable `Start` button in the preloader modal.

```ts
function onGameAssetsLoaded() {
  preloader.setReady();
}
```

### showLeaderboard()

This method shows `Leaderboard` modal which covers entire screen.

```ts
const modal = gamesSdk.showLeaderboard({
  onPlayAgain: () => {
    // Re-start the game
  },

  onBeforeLoad: () => {
    // Check if the wallet is connected or save unsaved player score
  },
});
```

#### Parameters

- `onPlayAgain` - a callback which is called when player requests to play the game again by clicking on `Play Again` button
- `onBeforeLoad` - a callback which is called right before the leaderboard data is requested

The method returns a modal instance with the following type:

```ts
type Modal = {
  readonly isOpen: boolean;
  open: () => void;
  close: () => void;
};
```

### showConnectWallet()

This method shows `Connect Wallet` modal which covers entire screen. The modal asks the player to connect their `Cere Wallet`.

```ts
const modal = gamesSdk.showConnectWallet({
  onConnect: () => {
    // The wallet is connected
  },
});
```

#### Parameters

- `onConnect` - a callback which is called when player connects their wallet

The method returns a modal instance with the following type:

```ts
type Modal = {
  readonly isOpen: boolean;
  open: () => void;
  close: () => void;
};
```

### saveScore()

This method shows saves the player score to `DDC`.

```ts
await gamesSdk.saveScore(500);
```

#### Parameters

- `score` - the player current score
