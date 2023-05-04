import type { Options } from '@wdio/types';

const headless = process.env.HEADLESS === 'true';

export const config: Options.Testrunner = {
  runner: 'local',
  baseUrl: 'http://localhost:8888',
  specs: ['./specs/**/*.ts'],

  capabilities: [
    {
      browserName: 'chrome',
      'wdio:devtoolsOptions': { headless },
    },
  ],

  logLevel: 'warn',
  maxInstances: 10,

  waitforTimeout: 5000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['devtools'],
  reporters: ['spec'],

  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true,
    },
  },

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    require: [require.resolve('mocha-steps')],
  },

  before: (capabilities, specs) => {
    require('./setup');
  },
};
