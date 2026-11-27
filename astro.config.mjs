// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://multitema-web-travel.pages.dev',
  output: 'static',
  trailingSlash: 'never',
  // 'file' genera cordada.html: Cloudflare Pages lo sirve en /cordada sin redirigir a /cordada/
  build: { format: 'file' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  vite: {
    plugins: [tailwindcss()],
  },
});
