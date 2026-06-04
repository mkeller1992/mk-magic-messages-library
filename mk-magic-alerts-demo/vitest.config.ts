import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@mk-magic-alerts': fileURLToPath(
        new URL('../mk-magic-alerts-lib/projects/mk-magic-alerts/src/public-api.ts', import.meta.url)
      )
    }
  },
  test: {
    environment: 'jsdom'
  }
});