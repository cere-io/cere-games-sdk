import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';

export const options = yargs(hideBin(process.argv)).options({
  variant: { choices: ['selenoid', 'chrome'] as const },
  headless: { type: 'boolean', default: false },
  startSelenoid: { type: 'boolean', default: false },
  maxInstances: { type: 'number', default: 1 },
}).argv;