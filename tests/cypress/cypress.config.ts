import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'umg9xu', // TODO: use corparate account
  trashAssetsBeforeRuns: false,

  e2e: {
    baseUrl: 'http://localhost:8888',
  },

  setupNodeEvents: (on) => {},
});
