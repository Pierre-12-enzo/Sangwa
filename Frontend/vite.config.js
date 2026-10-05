import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
        // Important for SSE: don't buffer the stream
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            if (req.headers.accept === 'text/event-stream') {
              proxyReq.setHeader('Cache-Control', 'no-cache');
              proxyReq.setHeader('Connection', 'keep-alive');
            }
          });
        }
      }
    }
  }
});