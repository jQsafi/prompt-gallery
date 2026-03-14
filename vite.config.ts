import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/prompt-gallery/', // Set base path for GitHub Pages
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
});
