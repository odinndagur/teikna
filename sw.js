if(!self.define){let s,e={};const a=(a,i)=>(a=new URL(a+".js",i).href,e[a]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=a,s.onload=e,document.head.appendChild(s)}else s=a,importScripts(a),e()})).then((()=>{let s=e[a];if(!s)throw new Error(`Module ${a} didn’t register its module`);return s})));self.define=(i,r)=>{const d=s||("document"in self?document.currentScript.src:"")||location.href;if(e[d])return;let n={};const c=s=>a(s,d),f={module:{uri:d},exports:n,require:c};e[d]=Promise.all(i.map((s=>f[s]||c(s)))).then((s=>(r(...s),n)))}}define(["./workbox-de803542"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"ca1941f3153de41d0fa9866539404971"},{url:"assets/images/android-chrome-192x192 copy.png",revision:"35e33305f6db2246dfb77efa4ae46b65"},{url:"assets/images/android-chrome-192x192.png",revision:"35e33305f6db2246dfb77efa4ae46b65"},{url:"assets/images/android-chrome-512x512.png",revision:"01bc1e5cff0cbe1acf9af35fa4dd1ffc"},{url:"assets/images/apple-icon-180 copy.png",revision:"beea743eadbfe293b5b3659625ab3d57"},{url:"assets/images/apple-icon-180.png",revision:"beea743eadbfe293b5b3659625ab3d57"},{url:"assets/images/apple-splash-1125-2436.jpg",revision:"c2491066a2bd911b6bb124e42eaef7e0"},{url:"assets/images/apple-splash-1136-640.jpg",revision:"09a6dc9b094d9e186316ed0a925fedf2"},{url:"assets/images/apple-splash-1170-2532.jpg",revision:"9e6330c05b1ef050a99dc795bbfff2bb"},{url:"assets/images/apple-splash-1179-2556.jpg",revision:"cf42ea2cb77a3088b898df1f7a860fb0"},{url:"assets/images/apple-splash-1242-2208.jpg",revision:"e1cf45f29494a7b7f8dfff79a61b1130"},{url:"assets/images/apple-splash-1242-2688.jpg",revision:"f722ad72834c9e964ef37c521f84b2d7"},{url:"assets/images/apple-splash-1284-2778.jpg",revision:"5d85792bb76a28927d2aba471402d41e"},{url:"assets/images/apple-splash-1290-2796.jpg",revision:"50e7ded9cd3702db1264c20358f1568c"},{url:"assets/images/apple-splash-1334-750.jpg",revision:"6883ec487b8eec2587dd031745bf2167"},{url:"assets/images/apple-splash-1536-2048.jpg",revision:"2bc5b6b677657ca9a1de659a7a846146"},{url:"assets/images/apple-splash-1620-2160.jpg",revision:"5c21bc4dc82b4c60f87401e52b891931"},{url:"assets/images/apple-splash-1668-2224.jpg",revision:"03bbcb553f94d9c8f7b114bc4833d49f"},{url:"assets/images/apple-splash-1668-2388.jpg",revision:"681469ba7e0d49bc3b5c042475bbfc6a"},{url:"assets/images/apple-splash-1792-828.jpg",revision:"4b91a56c80b03fd4f203dfad88d7c46a"},{url:"assets/images/apple-splash-2048-1536.jpg",revision:"4bc278eaf681cf7d7da3e12c4e25d980"},{url:"assets/images/apple-splash-2048-2732.jpg",revision:"745e80f1b829c4a3f50a770b96375f67"},{url:"assets/images/apple-splash-2160-1620.jpg",revision:"e1b8eefcfcb4d3a8370dbf4e3c8cac03"},{url:"assets/images/apple-splash-2208-1242.jpg",revision:"1ea11c557cd1372e0a17f7250dc9e896"},{url:"assets/images/apple-splash-2224-1668.jpg",revision:"13144e179b4e9b88fec28338c4177e29"},{url:"assets/images/apple-splash-2388-1668.jpg",revision:"7d6bdeafbb3ee904164593a07d87bf94"},{url:"assets/images/apple-splash-2436-1125.jpg",revision:"47122d5dd28d0a6cddbc975a08754735"},{url:"assets/images/apple-splash-2532-1170.jpg",revision:"8ab58d7770c69b77ceed9ba7497ffc09"},{url:"assets/images/apple-splash-2556-1179.jpg",revision:"bc052e877a952624a651afd49751196b"},{url:"assets/images/apple-splash-2688-1242.jpg",revision:"300e6620b3ccef60ef63b141c43eba04"},{url:"assets/images/apple-splash-2732-2048.jpg",revision:"549338c20d87228c70c70c1015027358"},{url:"assets/images/apple-splash-2778-1284.jpg",revision:"f86f57837c8844511adf5a0619ad62ad"},{url:"assets/images/apple-splash-2796-1290.jpg",revision:"68d920bf1c01d3beb98f61545da8de2e"},{url:"assets/images/apple-splash-640-1136.jpg",revision:"b7e7caad4b9126d659b431fc51243f4a"},{url:"assets/images/apple-splash-750-1334.jpg",revision:"1f65a0b05b3987aaefd3bb011b0785b0"},{url:"assets/images/apple-splash-828-1792.jpg",revision:"86a010d25f59f20891d7a4e912fa20b5"},{url:"assets/images/apple-splash-dark-1125-2436.png",revision:"86d4ff0f47d64e9e19c8c8fb356ba4c5"},{url:"assets/images/apple-splash-dark-1136-640.png",revision:"91a4e9a0b6ed7d9560326606e2a26c10"},{url:"assets/images/apple-splash-dark-1242-2208.png",revision:"34a58902435f52e708af26c86cce7a48"},{url:"assets/images/apple-splash-dark-1242-2688.png",revision:"e161942cad327515d001189956266ca7"},{url:"assets/images/apple-splash-dark-1334-750.png",revision:"c440ea0e2f6e6b416a35eb3ae738aa77"},{url:"assets/images/apple-splash-dark-1536-2048.png",revision:"0ed09bb8e81b041b0ed8dff23ab04a79"},{url:"assets/images/apple-splash-dark-1668-2224.png",revision:"80c9ad5d7611e74e2276ef40f891f230"},{url:"assets/images/apple-splash-dark-1668-2388.png",revision:"b7c8f7dc2e969e805c189d9ded28feae"},{url:"assets/images/apple-splash-dark-1792-828.png",revision:"c14fe5ed29254e48f5842cd2bfbaad17"},{url:"assets/images/apple-splash-dark-2048-1536.png",revision:"3712f55fe1eae5b83de4a7280057d268"},{url:"assets/images/apple-splash-dark-2048-2732.png",revision:"55796a8499f55e1601d6cb6c19d291b4"},{url:"assets/images/apple-splash-dark-2208-1242.png",revision:"6f257724075fe0a729a6020c2853bc17"},{url:"assets/images/apple-splash-dark-2224-1668.png",revision:"b0e52b2fadbb49f75215a432375e41c8"},{url:"assets/images/apple-splash-dark-2388-1668.png",revision:"403e8e4d5ac61280249a48bccb5b9bcc"},{url:"assets/images/apple-splash-dark-2436-1125.png",revision:"2fb6619ab8da2cfe5c93f3078617ef78"},{url:"assets/images/apple-splash-dark-2688-1242.png",revision:"2e5ee407e462dc5d8e1e50e0fd3ef51b"},{url:"assets/images/apple-splash-dark-2732-2048.png",revision:"031adc3a485c7cb718d5e4d4e2a18d0a"},{url:"assets/images/apple-splash-dark-640-1136.png",revision:"893c78054a1eb6205dff7b8e6101bf16"},{url:"assets/images/apple-splash-dark-750-1334.png",revision:"ef5719e920b589c5aca8cb67d22d6a2e"},{url:"assets/images/apple-splash-dark-828-1792.png",revision:"dd3246031fde90ccf97dce7a8d51036d"},{url:"assets/images/apple-touch-icon-114x114.png",revision:"9ebad810e629e3ad9a0fdf1e6dbc6f57"},{url:"assets/images/apple-touch-icon-120x120.png",revision:"23cb39bbd06410b8b2d4883a285c1ac3"},{url:"assets/images/apple-touch-icon-144x144.png",revision:"c597fd67732a8f781cda789c5cdbd84d"},{url:"assets/images/apple-touch-icon-152x152.png",revision:"a95d9495fe2d7e2c6fd7e9f597725951"},{url:"assets/images/apple-touch-icon-167x167.png",revision:"6b891c3f5fb15d8bc259ed64852f63f8"},{url:"assets/images/apple-touch-icon-180x180.png",revision:"7a25746c141cd46504bf2e1dc0287c7c"},{url:"assets/images/apple-touch-icon-57x57.png",revision:"4fe53cfb2c83d683a1dd0907affff131"},{url:"assets/images/apple-touch-icon-60x60.png",revision:"853aec4088af4e7a94a5524d3c4d7a02"},{url:"assets/images/apple-touch-icon-72x72.png",revision:"bff435e918e0c82f984f9eb22e7314ac"},{url:"assets/images/apple-touch-icon-76x76.png",revision:"765d6c5e37adc2b93fcfe4ea1588c414"},{url:"assets/images/favicon-128x128 copy.png",revision:"4aaf7c5ac85c9df18baafce138b8a668"},{url:"assets/images/favicon-128x128.png",revision:"4aaf7c5ac85c9df18baafce138b8a668"},{url:"assets/images/favicon-16x16 copy.png",revision:"eb7b404dd7a662007db09e4e1854c80c"},{url:"assets/images/favicon-16x16.png",revision:"eb7b404dd7a662007db09e4e1854c80c"},{url:"assets/images/favicon-196x196 copy.png",revision:"b86740f4a245232ddaec75a122de5d2b"},{url:"assets/images/favicon-196x196.png",revision:"b86740f4a245232ddaec75a122de5d2b"},{url:"assets/images/favicon-32x32 copy.png",revision:"56f4c171c4b78f017a1c3e23ac73952c"},{url:"assets/images/favicon-32x32.png",revision:"56f4c171c4b78f017a1c3e23ac73952c"},{url:"assets/images/favicon-96x96 copy.png",revision:"98ef36a7d8ca19dbd8326e1c11aaa3ba"},{url:"assets/images/favicon-96x96.png",revision:"98ef36a7d8ca19dbd8326e1c11aaa3ba"},{url:"assets/images/manifest-icon-192.maskable copy.png",revision:"7d23b9b3c6408daec81483d24025fb8d"},{url:"assets/images/manifest-icon-192.maskable.png",revision:"7d23b9b3c6408daec81483d24025fb8d"},{url:"assets/images/manifest-icon-512.maskable copy.png",revision:"7abc165ef6367d114b08d049b095632d"},{url:"assets/images/manifest-icon-512.maskable.png",revision:"7abc165ef6367d114b08d049b095632d"},{url:"assets/images/manifest-icon-dark-1024.png",revision:"bed6268c8c8523e6edf491596c25caf4"},{url:"assets/images/manifest-icon-dark-512.maskable.png",revision:"12222c3a461d79a4bb9a880bb69f1213"},{url:"assets/images/mstile-144x144 copy.png",revision:"c597fd67732a8f781cda789c5cdbd84d"},{url:"assets/images/mstile-144x144.png",revision:"c597fd67732a8f781cda789c5cdbd84d"},{url:"assets/images/mstile-150x150 copy.png",revision:"7b61af10061848d3a2a5b41596b62fe1"},{url:"assets/images/mstile-150x150.png",revision:"7b61af10061848d3a2a5b41596b62fe1"},{url:"assets/images/mstile-310x150 copy.png",revision:"289d35545a1cd2d22fff2150a7537bba"},{url:"assets/images/mstile-310x150.png",revision:"289d35545a1cd2d22fff2150a7537bba"},{url:"assets/images/mstile-310x310 copy.png",revision:"0303629c44ea9a571241616aece0b53c"},{url:"assets/images/mstile-310x310.png",revision:"0303629c44ea9a571241616aece0b53c"},{url:"assets/images/mstile-70x70 copy.png",revision:"9a88e7a8e8d564eb652d99460a2509e1"},{url:"assets/images/mstile-70x70.png",revision:"9a88e7a8e8d564eb652d99460a2509e1"},{url:"assets/images/r6013-logo.png",revision:"bcd97064bed6db6d1c57f9f83777d14c"},{url:"assets/index-17207895.css",revision:null},{url:"assets/index-ea79dec6.js",revision:null},{url:"assets/index.worker-2660f31b.js",revision:null},{url:"assets/indexeddb-main-thread-worker-e59fee74-e13ff922.js",revision:null},{url:"assets/itm-images/handform/1 handform.png",revision:"1a24cad4f664225e61c296756107c9f3"},{url:"assets/itm-images/handform/2 handform.png",revision:"2c02fea92742da0e80b89798be523b64"},{url:"assets/itm-images/handform/3 handform.png",revision:"3363a2f28bd888689e450c4008670cec"},{url:"assets/itm-images/handform/4 handform.png",revision:"f4033eb5f4db4888deabc8b5ab38e049"},{url:"assets/itm-images/handform/5 handform.png",revision:"cde17155d2354f9bf516929216eff2fd"},{url:"assets/itm-images/handform/6 handform.png",revision:"5817333b1dd088c8b29a743334be7afc"},{url:"assets/itm-images/handform/8 handform opið.png",revision:"0e09a8cffd1e9012e1be76a6d6b88e1a"},{url:"assets/itm-images/handform/A handform lokað.png",revision:"f97a84eb6f46a683b1e54fc4e2bf1163"},{url:"assets/itm-images/handform/A handform.png",revision:"6ef11264d118fac68a89a5a91b067051"},{url:"assets/itm-images/handform/Æ handform.png",revision:"d8a2e7445884f87cdf628fdd5ade0861"},{url:"assets/itm-images/handform/B handform bogið.png",revision:"489da469d2cf177f0f153461310b5669"},{url:"assets/itm-images/handform/B handform hálf lokað.png",revision:"69344a784b71a55cbb1fd8a5c293d055"},{url:"assets/itm-images/handform/B handform lokað.png",revision:"7090be8d8072380895c704ad6d7e5168"},{url:"assets/itm-images/handform/B handform sveigt.png",revision:"9d766ff63e9a725a035a18ab4b68c795"},{url:"assets/itm-images/handform/B handform.png",revision:"d3db7e230f9e19bd9104200a7d180f50"},{url:"assets/itm-images/handform/C handform lokað.png",revision:"ee6c3f712f1e9a11d41a5bd87d370c10"},{url:"assets/itm-images/handform/C handform þumall út.png",revision:"9b6cb015fba9e2d373ea793752e4ac51"},{url:"assets/itm-images/handform/C handform.png",revision:"07d1d1655002fbb0f03d9933108041cc"},{url:"assets/itm-images/handform/D handform.png",revision:"0b69efd430f587132394ec9c8af2e0ba"},{url:"assets/itm-images/handform/H handform bogið lokað.png",revision:"f03526607e59b279af11093a7594cf05"},{url:"assets/itm-images/handform/H handform lokað.png",revision:"258491d176f845054731c2e9977ca51e"},{url:"assets/itm-images/handform/H handform.png",revision:"83500d60590bbe4444eed164b8506569"},{url:"assets/itm-images/handform/I - 1 handform.png",revision:"b1019a3f61e674e982a213f62be5fd1d"},{url:"assets/itm-images/handform/I handform.png",revision:"727598d3728ef370fd6f875948fbc63e"},{url:"assets/itm-images/handform/O handform lokað.png",revision:"cadcdaa362f065c640eaf7bc329a0e51"},{url:"assets/itm-images/handform/O handform.png",revision:"86b8cef82ab56ce55296487fcd614f62"},{url:"assets/itm-images/handform/Q handform.png",revision:"1fead85d29c9af522323c7ffb767ccf5"},{url:"assets/itm-images/handform/R handform.png",revision:"7a227e22f6ee1676de0007a555d31068"},{url:"assets/itm-images/handform/V handform bogið.png",revision:"c53e30204a9b29eaae4c930ef3f69463"},{url:"assets/itm-images/handform/V handform.png",revision:"a691a891895ad4486c2959abe9afeac0"},{url:"assets/itm-images/handform/Vísi handform bogið.png",revision:"0158508cfd31d059a37b72b74ea489c9"},{url:"assets/itm-images/handform/Vísi handform lokað.png",revision:"bb50d5adfdccb5bdfce6517664bd691a"},{url:"assets/itm-images/handform/Vísi handform.png",revision:"db2e9794d173454c18b780bbc909ee6e"},{url:"assets/itm-images/handform/Y handform.png",revision:"1a16d3883557d5385ec316640f81e191"},{url:"assets/itm-images/myndunarstadir/Andlit.jpg",revision:"a0c54c05650b699a7532189440285068"},{url:"assets/itm-images/myndunarstadir/Bringa.jpg",revision:"55bc57bba885e4b990239de540ae1350"},{url:"assets/itm-images/myndunarstadir/Handleggur.jpg",revision:"54450d10ebc6d4a5887542d8b2552d46"},{url:"assets/itm-images/myndunarstadir/Hlutlaust rými.jpg",revision:"95874951ebf5644533385e8234a9b1bc"},{url:"assets/itm-images/myndunarstadir/Höfuð.jpg",revision:"f77e3f660e20a31e263ca813fa3b5187"},{url:"assets/itm-images/myndunarstadir/Líkami.jpg",revision:"6437b4af40ae5c00823e776543901f1a"},{url:"assets/itm-images/myndunarstadir/Óvirk hönd.jpg",revision:"4fa0069339ef5d4b337e5997ad7c66d1"},{url:"assets/sql-asm-debug.js",revision:"709e8c8381e90fc778db321938c96f9e"},{url:"assets/sql-asm-memory-growth.js",revision:"cc39ee4388dd47156694b301e54096d8"},{url:"assets/sql-asm.js",revision:"7c5c37c492b624c5092c8e19fcdc74c6"},{url:"assets/sql-wasm-debug.js",revision:"552b43611a2413481fd5d4cd4ba3d0d1"},{url:"assets/sql-wasm.js",revision:"dc3b00ac3781d7229d3227fd958546d6"},{url:"assets/worker.sql-asm-debug.js",revision:"e3222cdf26808d66ee4e4cf00f1acfa5"},{url:"assets/worker.sql-asm.js",revision:"f95483ba37db902e4463aebb98f6f3c6"},{url:"assets/worker.sql-wasm-debug.js",revision:"d6ed95da10fa9547c66a943559cb03e5"},{url:"assets/worker.sql-wasm.js",revision:"87be2b7d7c125f3e73c7788bdc42a923"},{url:"dark.css",revision:"57911e13d8a4b10477743998aad975d6"},{url:"index.html",revision:"6020bbc1dcde42598fb1c49a9462fb3a"},{url:"light.css",revision:"df9c4270b4f958b1a8ad8225fbeedd83"},{url:"registerSW.js",revision:"448ebd3beb256e535e2c80fa927d7184"},{url:"manifest.webmanifest",revision:"5b58842dc52ec86ed76775f1500c55ca"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))),s.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new s.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/film-grab\.com\/.*/i,new s.CacheFirst({cacheName:"filmgrab-images-cache",plugins:[new s.ExpirationPlugin({maxAgeSeconds:604800}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/i\.ytimg\.com\/.*/i,new s.CacheFirst({cacheName:"video-thumbnails-cache",plugins:[new s.ExpirationPlugin({maxEntries:10,maxAgeSeconds:604800}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
