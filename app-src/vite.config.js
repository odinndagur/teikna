import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    base: '/',
    define: {
        'process.env': {},
    },
    esbuild:
        command == 'build'
            ? {
                  drop: ['console', 'debugger'],
                  minify: true,
              }
            : undefined,

    plugins: [
        react({
            include: '**/*.tsx',
        }),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true,
            },
            manifest: {
                name: 'Teikna',
                short_name: 'Teikna',
                start_url: '/',
                display: 'standalone',
                theme_color: '#FFFFFF',
                background_color: '#FFFFFF',
                icons: [
                    {
                        src: '/assets/teikna-icons/manifest-icon-192.maskable.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any',
                    },
                    {
                        src: '/assets/teikna-icons/manifest-icon-192.maskable.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: '/assets/teikna-icons/manifest-icon-512.maskable.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any',
                    },
                    {
                        src: '/assets/teikna-icons/manifest-icon-512.maskable.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                ],
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],

                // globPatterns: ['**/*.{js,html,ico,png,svg,jpg,jpeg}'],
                navigateFallback: '/index.html',
                maximumFileSizeToCacheInBytes: 70000000,
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/teikna\.odinndagur\.com\/.*/i,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'odinndagur-teikna-cache',
                            expiration: {
                                maxEntries: 60,
                                maxAgeSeconds: 60 * 60 * 24 * 7, // <== 365 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'gstatic-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                    {
                        urlPattern: /^https:\/\/film-grab\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'filmgrab-images-cache',
                            expiration: {
                                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 dagar
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                    {
                        // https://i.ytimg.com/vi/${props.videoId}/maxresdefault.jpg
                        urlPattern: /^https:\/\/i\.ytimg\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'video-thumbnails-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 7, // <== 7 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                    {
                        // https://i.ytimg.com/vi/${props.videoId}/maxresdefault.jpg
                        // https://i.redd.it/lsxdgvnp6n8b1.gif
                        //  'https://i.redd.it/tphszp0jh09b1.jpg'
                        // urlPattern: /^https:\/\/i\.ytimg\.com\/.*/i,
                        urlPattern: /^https:\/\/i\.redd\.it\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'reddit-images-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 7, // <== 7 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                    {
                        urlPattern: /^.*.gif.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'gif-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 7, // <== 7 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                ],
            },
        }),
    ],
}))
