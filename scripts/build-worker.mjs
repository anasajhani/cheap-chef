import { build } from 'vite';
import { mkdir, copyFile, cp } from 'node:fs/promises';
await mkdir('dist/server', { recursive: true });
await mkdir('dist/.openai', { recursive: true });
await build({
  configFile: false,
  build: {
    lib: { entry: 'apps/worker/src/index.js', formats: ['es'], fileName: () => 'index.js' },
    outDir: 'dist/server',
    emptyOutDir: true,
    target: 'es2022',
    minify: true
  }
});
await copyFile('.openai/hosting.json', 'dist/.openai/hosting.json');
await cp('drizzle', 'dist/.openai/drizzle', { recursive: true });
