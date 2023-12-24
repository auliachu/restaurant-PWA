import 'regenerator-runtime';
import CacheHelper from "./utils/caches-helper";

const assetsToCache = [
    './',
    './icons/96x96.png',
    './icons/128x128.png',
    './icons/192x192.png',
    './icons/512x512.png',
    './index.html',
    './app.bundle.js',
    './app.webmanifest',
    './sw.bundle.js',
]

self.addEventListener('install', (event)=>{
    console.log('Installing service worker...')
    //caching app shell resource
    event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event)=>{
    console.log('Activating service worker...')
    //delete old caches
    event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event)=>{
    console.log(event.request);
    event.respondWith(CacheHelper.revalidateCache(event.request));
});
