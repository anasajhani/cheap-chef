import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  root: 'apps/web/pages',
  publicDir: '../public',
  base: '/cheap-chef/',
  plugins: [react(), tailwind()],
  build: { outDir: '../../../dist/pages', emptyOutDir: true },
});
