import type { Options } from '@wdio/types';
import { configure } from '@testing-library/webdriverio';

const headless = process.env.HEADLESS === 'true';

export const config: Options.Testrunner = {
  runner: 'local',
  baseUrl: 'http://localhost:8888',
  specs: ['./specs/**/*.ts'],

  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: headless ? ['--headless', '--disable-gpu'] : [],
      },
    },
  ],

  logLevel: 'warn',
  maxInstances: 10,

  waitforTimeout: 5000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['chromedriver'],
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
