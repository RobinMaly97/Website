import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { Connect } from 'vite';

const redirectChickenLove: Connect.NextHandleFunction = (req, res, next) => {
  if (req.url === '/chickenlove') {
    res.writeHead(301, { Location: '/chickenlove/' });
    return res.end();
  }
  next();
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      // Dev/preview: /chickenlove (no trailing slash) would hit the SPA fallback
      // and show the home page — redirect to the folder URL instead.
      // On Netlify this is handled by the redirect in netlify.toml.
      name: 'chickenlove-trailing-slash',
      configureServer: (server) => void server.middlewares.use(redirectChickenLove),
      configurePreviewServer: (server) => void server.middlewares.use(redirectChickenLove),
    },
  ],
  build: {
    target: 'es2020',
    // Split the heavy 3D libraries into their own cacheable chunks so the
    // critical UI shell can paint before the WebGL bundle finishes loading.
    rollupOptions: {
      input: {
        main: 'index.html',
        impressum: 'impressum.html',
        datenschutz: 'datenschutz.html',
        agb: 'agb.html',
        chickenlove: 'chickenlove/index.html',
      },
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei'],
          motion: ['gsap', 'lenis', 'framer-motion'],
        },
      },
    },
  },
});
