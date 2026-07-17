const CACHE_NAME = 'fitforge-v5';  // every update, change this version

self.addEventListener('install', event => {
  self.skipWaiting();  // don't wait for old tabs
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(['.', 'index.html', 'manifest.json']);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())  // take control immediately
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
