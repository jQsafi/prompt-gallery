import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '', // Final attempt: empty string for potentially better GitHub Pages compatibility
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
});
