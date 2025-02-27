import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0', // Cela le rend accessible depuis n'importe quelle adresse
        port: 5173,
        allowedHosts: ['5163-157-143-128-238.ngrok-free.app', 'localhost'], // Ajout de l'hôte autorisé
    },
    plugins: [react()],
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        target: 'esnext', // Assurer la compatibilité
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
});
