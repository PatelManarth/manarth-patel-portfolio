import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://staging.manarthpatel.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' }
});
