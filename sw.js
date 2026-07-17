const CACHE_NAME = 'fitforge-v1';
const urlsToCache = [
  '.',
  'index.html',
  'manifest.json'
];

// Install event – cache core files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event – serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});