import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/prompt-gallery/', // Re-setting to repository name for GitHub Pages project site
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
});
