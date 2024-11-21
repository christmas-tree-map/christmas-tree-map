import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@/pages': '/src/pages',
      '@/components': '/src/components',
      '@/apis': '/src/apis',
      '@/hooks': '/src/hooks',
      '@/queries': '/src/queries',
      '@/utils': '/src/utils',
      '@/mocks': '/src/mocks',
      '@/constants': '/src/constants',
      '@/assets': '/src/assets',
      '@/styles': '/src/styles',
    },
  },
});
