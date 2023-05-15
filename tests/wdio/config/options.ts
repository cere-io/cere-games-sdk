import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';

export const options = yargs(hideBin(process.argv)).options({
  variant: { choices: ['selenium', 'chrome'] as const },
  headless: { type: 'boolean', default: false },
}).argv;
