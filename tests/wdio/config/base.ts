import { configure } from '@testing-library/webdriverio';

export const config: WebdriverIO.Config = {
  runner: 'local',
  baseUrl: 'http://localhost:8888',
  specs: ['./specs/**/*.ts'],
  capabilities: [],

  logLevel: 'warn',
  maxInstances: 10,

  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
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
    timeout: 60000,
    require: [require.resolve('mocha-steps')],
  },

  before: (capabilities, specs) => {
    require('./setup');
  },
};

configure({
  asyncUtilTimeout: config.waitforTimeout,
});
