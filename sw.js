if(!self.define){let s,e={};const a=(a,i)=>(a=new URL(a+".js",i).href,e[a]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=a,s.onload=e,document.head.appendChild(s)}else s=a,importScripts(a),e()})).then((()=>{let s=e[a];if(!s)throw new Error(`Module ${a} didn’t register its module`);return s})));self.define=(i,c)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let d={};const r=s=>a(s,n),p={module:{uri:n},exports:d,require:r};e[n]=Promise.all(i.map((s=>p[s]||r(s)))).then((s=>(c(...s),d)))}}define(["./workbox-6024ab09"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"f9e7dc10c98db5ceed66d971a124ca78"},{url:"assets/images/android-chrome-192x192 copy.png",revision:"35e33305f6db2246dfb77efa4ae46b65"},{url:"assets/images/android-chrome-192x192.png",revision:"35e33305f6db2246dfb77efa4ae46b65"},{url:"assets/images/android-chrome-512x512.png",revision:"01bc1e5cff0cbe1acf9af35fa4dd1ffc"},{url:"assets/images/apple-icon-180 copy.png",revision:"beea743eadbfe293b5b3659625ab3d57"},{url:"assets/images/apple-icon-180.png",revision:"beea743eadbfe293b5b3659625ab3d57"},{url:"assets/images/apple-splash-1125-2436.jpg",revision:"c2491066a2bd911b6bb124e42eaef7e0"},{url:"assets/images/apple-splash-1136-640.jpg",revision:"09a6dc9b094d9e186316ed0a925fedf2"},{url:"assets/images/apple-splash-1170-2532.jpg",revision:"9e6330c05b1ef050a99dc795bbfff2bb"},{url:"assets/images/apple-splash-1179-2556.jpg",revision:"cf42ea2cb77a3088b898df1f7a860fb0"},{url:"assets/images/apple-splash-1242-2208.jpg",revision:"e1cf45f29494a7b7f8dfff79a61b1130"},{url:"assets/images/apple-splash-1242-2688.jpg",revision:"f722ad72834c9e964ef37c521f84b2d7"},{url:"assets/images/apple-splash-1284-2778.jpg",revision:"5d85792bb76a28927d2aba471402d41e"},{url:"assets/images/apple-splash-1290-2796.jpg",revision:"50e7ded9cd3702db1264c20358f1568c"},{url:"assets/images/apple-splash-1334-750.jpg",revision:"6883ec487b8eec2587dd031745bf2167"},{url:"assets/images/apple-splash-1536-2048.jpg",revision:"2bc5b6b677657ca9a1de659a7a846146"},{url:"assets/images/apple-splash-1620-2160.jpg",revision:"5c21bc4dc82b4c60f87401e52b891931"},{url:"assets/images/apple-splash-1668-2224.jpg",revision:"03bbcb553f94d9c8f7b114bc4833d49f"},{url:"assets/images/apple-splash-1668-2388.jpg",revision:"681469ba7e0d49bc3b5c042475bbfc6a"},{url:"assets/images/apple-splash-1792-828.jpg",revision:"4b91a56c80b03fd4f203dfad88d7c46a"},{url:"assets/images/apple-splash-2048-1536.jpg",revision:"4bc278eaf681cf7d7da3e12c4e25d980"},{url:"assets/images/apple-splash-2048-2732.jpg",revision:"745e80f1b829c4a3f50a770b96375f67"},{url:"assets/images/apple-splash-2160-1620.jpg",revision:"e1b8eefcfcb4d3a8370dbf4e3c8cac03"},{url:"assets/images/apple-splash-2208-1242.jpg",revision:"1ea11c557cd1372e0a17f7250dc9e896"},{url:"assets/images/apple-splash-2224-1668.jpg",revision:"13144e179b4e9b88fec28338c4177e29"},{url:"assets/images/apple-splash-2388-1668.jpg",revision:"7d6bdeafbb3ee904164593a07d87bf94"},{url:"assets/images/apple-splash-2436-1125.jpg",revision:"47122d5dd28d0a6cddbc975a08754735"},{url:"assets/images/apple-splash-2532-1170.jpg",revision:"8ab58d7770c69b77ceed9ba7497ffc09"},{url:"assets/images/apple-splash-2556-1179.jpg",revision:"bc052e877a952624a651afd49751196b"},{url:"assets/images/apple-splash-2688-1242.jpg",revision:"300e6620b3ccef60ef63b141c43eba04"},{url:"assets/images/apple-splash-2732-2048.jpg",revision:"549338c20d87228c70c70c1015027358"},{url:"assets/images/apple-splash-2778-1284.jpg",revision:"f86f57837c8844511adf5a0619ad62ad"},{url:"assets/images/apple-splash-2796-1290.jpg",revision:"68d920bf1c01d3beb98f61545da8de2e"},{url:"assets/images/apple-splash-640-1136.jpg",revision:"b7e7caad4b9126d659b431fc51243f4a"},{url:"assets/images/apple-splash-750-1334.jpg",revision:"1f65a0b05b3987aaefd3bb011b0785b0"},{url:"assets/images/apple-splash-828-1792.jpg",revision:"86a010d25f59f20891d7a4e912fa20b5"},{url:"assets/images/apple-splash-dark-1125-2436.png",revision:"86d4ff0f47d64e9e19c8c8fb356ba4c5"},{url:"assets/images/apple-splash-dark-1136-640.png",revision:"91a4e9a0b6ed7d9560326606e2a26c10"},{url:"assets/images/apple-splash-dark-1242-2208.png",revision:"34a58902435f52e708af26c86cce7a48"},{url:"assets/images/apple-splash-dark-1242-2688.png",revision:"e161942cad327515d001189956266ca7"},{url:"assets/images/apple-splash-dark-1334-750.png",revision:"c440ea0e2f6e6b416a35eb3ae738aa77"},{url:"assets/images/apple-splash-dark-1536-2048.png",revision:"0ed09bb8e81b041b0ed8dff23ab04a79"},{url:"assets/images/apple-splash-dark-1668-2224.png",revision:"80c9ad5d7611e74e2276ef40f891f230"},{url:"assets/images/apple-splash-dark-1668-2388.png",revision:"b7c8f7dc2e969e805c189d9ded28feae"},{url:"assets/images/apple-splash-dark-1792-828.png",revision:"c14fe5ed29254e48f5842cd2bfbaad17"},{url:"assets/images/apple-splash-dark-2048-1536.png",revision:"3712f55fe1eae5b83de4a7280057d268"},{url:"assets/images/apple-splash-dark-2048-2732.png",revision:"55796a8499f55e1601d6cb6c19d291b4"},{url:"assets/images/apple-splash-dark-2208-1242.png",revision:"6f257724075fe0a729a6020c2853bc17"},{url:"assets/images/apple-splash-dark-2224-1668.png",revision:"b0e52b2fadbb49f75215a432375e41c8"},{url:"assets/images/apple-splash-dark-2388-1668.png",revision:"403e8e4d5ac61280249a48bccb5b9bcc"},{url:"assets/images/apple-splash-dark-2436-1125.png",revision:"2fb6619ab8da2cfe5c93f3078617ef78"},{url:"assets/images/apple-splash-dark-2688-1242.png",revision:"2e5ee407e462dc5d8e1e50e0fd3ef51b"},{url:"assets/images/apple-splash-dark-2732-2048.png",revision:"031adc3a485c7cb718d5e4d4e2a18d0a"},{url:"assets/images/apple-splash-dark-640-1136.png",revision:"893c78054a1eb6205dff7b8e6101bf16"},{url:"assets/images/apple-splash-dark-750-1334.png",revision:"ef5719e920b589c5aca8cb67d22d6a2e"},{url:"assets/images/apple-splash-dark-828-1792.png",revision:"dd3246031fde90ccf97dce7a8d51036d"},{url:"assets/images/apple-touch-icon-114x114.png",revision:"9ebad810e629e3ad9a0fdf1e6dbc6f57"},{url:"assets/images/apple-touch-icon-120x120.png",revision:"23cb39bbd06410b8b2d4883a285c1ac3"},{url:"assets/images/apple-touch-icon-144x144.png",revision:"c597fd67732a8f781cda789c5cdbd84d"},{url:"assets/images/apple-touch-icon-152x152.png",revision:"a95d9495fe2d7e2c6fd7e9f597725951"},{url:"assets/images/apple-touch-icon-167x167.png",revision:"6b891c3f5fb15d8bc259ed64852f63f8"},{url:"assets/images/apple-touch-icon-180x180.png",revision:"7a25746c141cd46504bf2e1dc0287c7c"},{url:"assets/images/apple-touch-icon-57x57.png",revision:"4fe53cfb2c83d683a1dd0907affff131"},{url:"assets/images/apple-touch-icon-60x60.png",revision:"853aec4088af4e7a94a5524d3c4d7a02"},{url:"assets/images/apple-touch-icon-72x72.png",revision:"bff435e918e0c82f984f9eb22e7314ac"},{url:"assets/images/apple-touch-icon-76x76.png",revision:"765d6c5e37adc2b93fcfe4ea1588c414"},{url:"assets/images/favicon-128x128 copy.png",revision:"4aaf7c5ac85c9df18baafce138b8a668"},{url:"assets/images/favicon-128x128.png",revision:"4aaf7c5ac85c9df18baafce138b8a668"},{url:"assets/images/favicon-16x16 copy.png",revision:"eb7b404dd7a662007db09e4e1854c80c"},{url:"assets/images/favicon-16x16.png",revision:"eb7b404dd7a662007db09e4e1854c80c"},{url:"assets/images/favicon-196x196 copy.png",revision:"b86740f4a245232ddaec75a122de5d2b"},{url:"assets/images/favicon-196x196.png",revision:"b86740f4a245232ddaec75a122de5d2b"},{url:"assets/images/favicon-32x32 copy.png",revision:"56f4c171c4b78f017a1c3e23ac73952c"},{url:"assets/images/favicon-32x32.png",revision:"56f4c171c4b78f017a1c3e23ac73952c"},{url:"assets/images/favicon-96x96 copy.png",revision:"98ef36a7d8ca19dbd8326e1c11aaa3ba"},{url:"assets/images/favicon-96x96.png",revision:"98ef36a7d8ca19dbd8326e1c11aaa3ba"},{url:"assets/images/manifest-icon-192.maskable copy.png",revision:"7d23b9b3c6408daec81483d24025fb8d"},{url:"assets/images/manifest-icon-192.maskable.png",revision:"7d23b9b3c6408daec81483d24025fb8d"},{url:"assets/images/manifest-icon-512.maskable copy.png",revision:"7abc165ef6367d114b08d049b095632d"},{url:"assets/images/manifest-icon-512.maskable.png",revision:"7abc165ef6367d114b08d049b095632d"},{url:"assets/images/manifest-icon-dark-1024.png",revision:"bed6268c8c8523e6edf491596c25caf4"},{url:"assets/images/manifest-icon-dark-512.maskable.png",revision:"12222c3a461d79a4bb9a880bb69f1213"},{url:"assets/images/mstile-144x144 copy.png",revision:"c597fd67732a8f781cda789c5cdbd84d"},{url:"assets/images/mstile-144x144.png",revision:"c597fd67732a8f781cda789c5cdbd84d"},{url:"assets/images/mstile-150x150 copy.png",revision:"7b61af10061848d3a2a5b41596b62fe1"},{url:"assets/images/mstile-150x150.png",revision:"7b61af10061848d3a2a5b41596b62fe1"},{url:"assets/images/mstile-310x150 copy.png",revision:"289d35545a1cd2d22fff2150a7537bba"},{url:"assets/images/mstile-310x150.png",revision:"289d35545a1cd2d22fff2150a7537bba"},{url:"assets/images/mstile-310x310 copy.png",revision:"0303629c44ea9a571241616aece0b53c"},{url:"assets/images/mstile-310x310.png",revision:"0303629c44ea9a571241616aece0b53c"},{url:"assets/images/mstile-70x70 copy.png",revision:"9a88e7a8e8d564eb652d99460a2509e1"},{url:"assets/images/mstile-70x70.png",revision:"9a88e7a8e8d564eb652d99460a2509e1"},{url:"assets/images/r6013-logo.png",revision:"bcd97064bed6db6d1c57f9f83777d14c"},{url:"assets/index-3608b6ab.css",revision:null},{url:"assets/index-d7aa7684.js",revision:null},{url:"assets/index.worker-534e4488.js",revision:null},{url:"assets/indexeddb-main-thread-worker-e59fee74-e13ff922.js",revision:null},{url:"assets/sql-asm-debug.js",revision:"709e8c8381e90fc778db321938c96f9e"},{url:"assets/sql-asm-memory-growth.js",revision:"cc39ee4388dd47156694b301e54096d8"},{url:"assets/sql-asm.js",revision:"7c5c37c492b624c5092c8e19fcdc74c6"},{url:"assets/sql-wasm-debug.js",revision:"552b43611a2413481fd5d4cd4ba3d0d1"},{url:"assets/sql-wasm.js",revision:"dc3b00ac3781d7229d3227fd958546d6"},{url:"assets/teikna-icons/icons/icon-128x128.png",revision:"f30b0eb079f9b510fad941bbe3c21e04"},{url:"assets/teikna-icons/icons/icon-144x144.png",revision:"5c07f0bc85963b409593320de65327cc"},{url:"assets/teikna-icons/icons/icon-152x152.png",revision:"3829454f101f230fb98601b45b6a4a2d"},{url:"assets/teikna-icons/icons/icon-192x192.png",revision:"fc0dd56e9045e7cefb3c39c50e1756d4"},{url:"assets/teikna-icons/icons/icon-384x384.png",revision:"a1a2d3ab939b523374d808c18a47ba50"},{url:"assets/teikna-icons/icons/icon-48x48.png",revision:"7886ee9a89fab612140ae677a23dda09"},{url:"assets/teikna-icons/icons/icon-512x512.png",revision:"c22c9a843426f5b0d6a0cc39d4ef824d"},{url:"assets/teikna-icons/icons/icon-72x72.png",revision:"b829330769576faff7cc7c9b1118d0cd"},{url:"assets/teikna-icons/icons/icon-96x96.png",revision:"8a9ab26a1d21636d5acd35acd3141d7c"},{url:"assets/worker.sql-asm-debug.js",revision:"e3222cdf26808d66ee4e4cf00f1acfa5"},{url:"assets/worker.sql-asm.js",revision:"f95483ba37db902e4463aebb98f6f3c6"},{url:"assets/worker.sql-wasm-debug.js",revision:"d6ed95da10fa9547c66a943559cb03e5"},{url:"assets/worker.sql-wasm.js",revision:"87be2b7d7c125f3e73c7788bdc42a923"},{url:"dark.css",revision:"6eb740f6c3218d611736a3b29b3ef0cf"},{url:"index.html",revision:"37ed791da9bd010f4a0e90c6a75aaf87"},{url:"light.css",revision:"59b39ee57b5bcd5830e13c7e2a236572"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"assets/teikna-icons/icons/icon-72x72.png",revision:"b829330769576faff7cc7c9b1118d0cd"},{url:"assets/teikna-icons/icons/icon-96x96.png",revision:"8a9ab26a1d21636d5acd35acd3141d7c"},{url:"assets/teikna-icons/icons/icon-128x128.png",revision:"f30b0eb079f9b510fad941bbe3c21e04"},{url:"assets/teikna-icons/icons/icon-144x144.png",revision:"5c07f0bc85963b409593320de65327cc"},{url:"assets/teikna-icons/icons/icon-152x152.png",revision:"3829454f101f230fb98601b45b6a4a2d"},{url:"assets/teikna-icons/icons/icon-192x192.png",revision:"fc0dd56e9045e7cefb3c39c50e1756d4"},{url:"assets/teikna-icons/icons/icon-384x384.png",revision:"a1a2d3ab939b523374d808c18a47ba50"},{url:"assets/teikna-icons/icons/icon-512x512.png",revision:"c22c9a843426f5b0d6a0cc39d4ef824d"},{url:"manifest.webmanifest",revision:"8d320bb54cdae6e3d905e286ef0321d0"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("/index.html"))),s.registerRoute(/^https:\/\/teikna\.odinndagur\.com\/.*/i,new s.NetworkFirst({cacheName:"odinndagur-teikna-cache",plugins:[new s.ExpirationPlugin({maxEntries:60,maxAgeSeconds:604800}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new s.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/film-grab\.com\/.*/i,new s.CacheFirst({cacheName:"filmgrab-images-cache",plugins:[new s.ExpirationPlugin({maxAgeSeconds:604800}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/i\.ytimg\.com\/.*/i,new s.CacheFirst({cacheName:"video-thumbnails-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:604800}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/i\.redd\.it\/.*/i,new s.CacheFirst({cacheName:"reddit-images-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:604800}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^.*.gif.*/i,new s.CacheFirst({cacheName:"gif-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:604800}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
