import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig(({ mode }) => ({
  plugins: [vue(), vuetify(), envInfoPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: loadEnv(mode, process.cwd()).VITE_BASE_URL,
        changeOrigin: true,
        protocolRewrite: true
        // rewrite: (path) => {
        //   if (mode === 'localdev') return path.replace(/^\/api/, '');
        //   return path;
        // }
      }
    }
  }
}));

const envInfoPlugin = () => ({
  name: 'env-info',
  configResolved: ({ mode, env }) => {
    console.info('\x1b[32m%s\x1b[0m', '\n  Running Env Status 🚀\n');
    console.info(
      '\x1b[34m%s\x1b[0m',
      '  ✅ Mode:   ',
      `${mode === 'localdev' ? 'Local' : mode.replace(/^\w/, (c) => c.toUpperCase())}`
    );
    console.info(
      '\x1b[35m%s\x1b[0m',
      '  🌐 Server: ',
      `${env.VITE_BASE_URL}\n`
    );
  }
});
