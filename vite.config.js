import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { handleAvatarApi } from './server/avatarApi.js';
import { handleVideoStream } from './server/videoStreamMiddleware.js';

// Custom Vite plugin to handle /api/avatar/* endpoints and HTTP video streaming with Range requests
function customServerPlugin() {
  return {
    name: 'custom-server-plugin',
    configureServer(server) {
      // 1. Video streaming middleware (HTTP 206 Range requests for MP4/WebM)
      server.middlewares.use((req, res, next) => {
        handleVideoStream(req, res, next);
      });

      // 2. Avatar API
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api/avatar')) {
          handleAvatarApi(req, res, next);
        } else {
          next();
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), customServerPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false,
    watch: {
      ignored: ['**/backups/**', '**/*.zip', '**/scratch/**', '**/*.TMP', '**/*.tmp', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.mp4', '**/*.webm', '**/public/avatar/**'],
    },
  },
});
