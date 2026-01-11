import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/index.ts'),
      constants: path.resolve(__dirname, 'src/constants/index.ts'),
      hocs: path.resolve(__dirname, 'src/hocs/index.ts'),
      hooks: path.resolve(__dirname, 'src/hooks/index.ts'),
      i18n: path.resolve(__dirname, 'src/i18n/index.ts'),
      pages: path.resolve(__dirname, 'src/pages/index.ts'),
      services: path.resolve(__dirname, 'src/services/index.ts'),
      shared: path.resolve(__dirname, '../shared/index.ts'),
      types: path.resolve(__dirname, 'src/types/index.ts'),
      utils: path.resolve(__dirname, 'src/utils/index.ts'),
    },
  },
});
