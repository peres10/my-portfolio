import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const isProduction = process.env.NODE_ENV === 'production';
const repositoryName = 'my-portfolio';

// https://vite.dev/config/
export default defineConfig({
    base: isProduction ? `/${repositoryName}/` : `/${repositoryName}/`,
    plugins: [
      react(),
      tailwindcss(),
    ],
})
