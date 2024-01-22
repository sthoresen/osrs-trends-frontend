import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react({
        babel: {
            plugins: ["@babel/plugin-syntax-import-assertions"],
        }
    })],
    resolve: {
        alias: [
            { find: '@assets', replacement: '/src/assets' },
            { find: '@components', replacement: '/src/components' },
            { find: '@pages', replacement: '/src/pages' },
            { find: '@data', replacement: '/data' },
            { find: '@src', replacement: '/src' },
        ],
    },
    base: '/osrs-trends-frontend/osrs-trends/',
});
