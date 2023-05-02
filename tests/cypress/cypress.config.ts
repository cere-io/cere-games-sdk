import { defineConfig } from 'cypress';

export default defineConfig({
  trashAssetsBeforeRuns: false,

  e2e: {
    baseUrl: 'http://localhost:8888',
  },

  setupNodeEvents: (on) => {},
});
