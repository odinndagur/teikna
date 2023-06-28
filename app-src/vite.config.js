import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/teikna/',
    define: {
        'process.env': {},
    },
    plugins: [
        react({
            include: '**/*.tsx',
        }),
        VitePWA({
            registerType: 'autoUpdate',
            // devOptions: {
            //     enabled: true,
            // },
            manifest: {
                name: 'Teikna',
                short_name: 'Teikna',
                start_url: '/teikna/',
                display: 'standalone',
                theme_color: '#FFFFFF',
                background_color: '#FFFFFF',
                icons: [
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
                navigateFallback: 'index.html',
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
                ],
            },
        }),
    ],
})
