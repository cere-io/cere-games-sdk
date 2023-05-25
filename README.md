# Cere Games SDK mono repository

The repository includes several packages related to `Cere Games SDK`:

- [Cere Games SDK](https://github.com/cere-io/cere-games-sdk/tree/master/packages/sdk) - the SDK itself
- [Cere Games SDK UI](https://github.com/cere-io/cere-games-sdk/tree/master/packages/ui) - the SDK UI elements
- Other utility packages

## Quick start

1. Install dependencies:

```bash
nvm exec npm i
```

2. Run playground application:

```bash
nvm exec npm run playground
```

3. Run examples:

```bash
nvm exec npm start
```

4. Build libraries in production mode:

```bash
nvm exec npm run build
```

5. Publish the packages to NPM:

```bash
nvm exec npm run sdk:publish
```

## Auto tests

1. Build libraries and examples

```bash
nvm exec npm run build
```

2. Run tests

```bash
nvm exec npm test # headless
nvm exec npm start --workspace @cere-games-sdk/wdio # in browser
```

3. Generate and open report

```bash
npm run test:report
```

## Simulation

1. Build the application bundle

```bash
nvm exec npm run build
```

2. Run simulation

```bash
nvm exec npm test -- --suite=simulation --maxInstances=5 --multi-run=10 # headless
nvm exec npm start --workspace @cere-games-sdk/wdio -- --suite=simulation --maxInstances=5 --multi-run=10 # in browser
```

3. Generate and open report

```bash
npm run test:report
```
