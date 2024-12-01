import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  }
})
