import * as path from 'path';
import { configure } from '@testing-library/webdriverio';

const rootDir = path.resolve(__dirname, '../../..');

export const config: WebdriverIO.Config = {
  runner: 'local',
  baseUrl: 'http://localhost:4567/examples/',
  specs: ['./specs/**/*.ts'],
  capabilities: [],

  logLevel: 'debug',
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
