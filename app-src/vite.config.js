import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    define: {
        'process.env': {},
    },
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
                        src: '/assets/teikna-icons/icons/icon-72x72.png',
                        sizes: '72x72',
                        type: 'image/png',
                        purpose: 'maskable any',
                    },
                    {
                        src: '/assets/teikna-icons/icons/icon-96x96.png',
                        sizes: '96x96',
                        type: 'image/png',
                        purpose: 'maskable any',
                    },
                    {
                        src: '/assets/teikna-icons/icons/icon-128x128.png',
                        sizes: '128x128',
                        type: 'image/png',
                        purpose: 'maskable any',
                    },
                    {
                        src: '/assets/teikna-icons/icons/icon-144x144.png',
                        sizes: '144x144',
                        type: 'image/png',
                        purpose: 'maskable any',
                    },
                    {
                        src: '/assets/teikna-icons/icons/icon-152x152.png',
                        sizes: '152x152',
                        type: 'image/png',
                        purpose: 'maskable any',
                    },
                    {
                        src: '/assets/teikna-icons/icons/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'maskable any',
                    },
                    {
                        src: '/assets/teikna-icons/icons/icon-384x384.png',
                        sizes: '384x384',
                        type: 'image/png',
                        purpose: 'maskable any',
                    },
                    {
                        src: '/assets/teikna-icons/icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable any',
                    },

                    // {
                    //     src: '/teikna/splash_screens/icon.png',
                    //     sizes: '512x512',
                    //     type: 'image/png',
                    //     purpose: 'any',
                    // },
                    // {
                    //     src: 'assets/images/manifest-icon-192.maskable.png',
                    //     sizes: '192x192',
                    //     type: 'image/png',
                    //     purpose: 'any',
                    // },
                    // {
                    //     src: 'assets/images/manifest-icon-192.maskable.png',
                    //     sizes: '192x192',
                    //     type: 'image/png',
                    //     purpose: 'maskable',
                    // },
                    // {
                    //     src: 'assets/images/manifest-icon-512.maskable.png',
                    //     sizes: '512x512',
                    //     type: 'image/png',
                    //     purpose: 'any',
                    // },
                    // {
                    //     src: 'assets/images/manifest-icon-512.maskable.png',
                    //     sizes: '512x512',
                    //     type: 'image/png',
                    //     purpose: 'maskable',
                    // },
                ],
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
                // globPatterns: ['**/*.{js,html,ico,png,svg,jpg,jpeg}'],
                navigateFallback: '/teikna/index.html',
                maximumFileSizeToCacheInBytes: 70000000,
                runtimeCaching: [
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
})
