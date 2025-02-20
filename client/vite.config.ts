import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/courses': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/departments': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/students': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});