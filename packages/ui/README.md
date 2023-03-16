# Cere Games SDK UI

`Cere Games SDK UI` is an NPM package which provides a set of UI elements ([Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)) which can be used in a game.

```
This package is used by `@cere/games-sdk` and should not be used directly at the moment
```

# Installation

Using `NPM`:

```bash
npm install @cere/games-sdk-ui --save
```

Using `yarn`:

```bash
yarn add @cere/games-sdk-ui
```

# API

- [register()](#register)
- [createContext()](#createcontext)

## register()

Registers UI elements to be later used by `Cere Games SDK` or inside game logic

```ts
import { register } from '@cere/games-sdk-u';

await register({...});
```

#### Parameters

- `context` - UI elements context created by [createContext()](#createcontext)

### createContext()

Creates context object for [register()](#register)

```ts
import { register, createContext } from '@cere/games-sdk-u';

const uiContext = createContext();
await register(uiContext);

uiContext.wallet.address = '0x0...'; // The UI is automatically updated with the new address
```
