import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  /**
   * Use relative public base path for self-contained build
   * - https://vitejs.dev/guide/static-deploy.html#github-pages
   * - https://vitejs.dev/config/shared-options.html#base
   * - https://stackoverflow.com/questions/69744253/vite-build-always-using-static-paths
   *
   */
  base: './',
});
