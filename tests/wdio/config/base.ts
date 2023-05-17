import * as path from 'path';
import { configure } from '@testing-library/webdriverio';

import { options } from './options';

const rootDir = path.resolve(__dirname, '../../..');

const chromeArgs = ['--window-size=1920,1080', '--disable-dev-shm-usage', '--no-sandbox', '--mute-audio'];

if (options.headless) {
  chromeArgs.push('--headless', '--disable-gpu');
}

export const chromeCapability = {
  browserName: 'chrome',
  acceptInsecureCerts: true,

  'goog:chromeOptions': {
    args: chromeArgs,
  },
};

export const config: WebdriverIO.Config = {
  runner: 'local',
  baseUrl: 'http://localhost:4567/examples/',
  specs: ['./specs/**/*.ts'],
  capabilities: [chromeCapability],

  logLevel: 'warn',
  maxInstances: 10,

  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: [
    [
      'static-server',
      {
        folders: [
          {
            mount: '/',
            path: path.resolve(rootDir, 'build'),
          },
        ],
      },
    ],
  ],

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
