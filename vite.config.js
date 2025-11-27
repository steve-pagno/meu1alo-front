import react from '@vitejs/plugin-react';
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import { defineConfig } from 'vite';
import envCompatible from 'vite-plugin-env-compatible';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
    build: {
        outDir: 'build',
    },
    envPrefix: 'REACT_APP_',
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: 'globalThis',
            },
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true,
                }),
            ],
        },
    },
    plugins: [
        react(),
        envCompatible(),
        svgrPlugin({
            svgrPlugin: {
                icon: true,
            },
        }),
    ]
});
