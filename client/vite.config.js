import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/usuarios': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/paseos': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/perros': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/pagos': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
