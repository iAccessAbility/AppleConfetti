const CACHE_NAME = 'apple-confetti-v1';
const FILES_TO_CACHE = [
  '/apple-blue.png',
  '/apple-gray.png',
  '/apple-green.png',
  '/apple-orange.png',
  '/apple-pink.png',
  '/apple-purple.png',
  '/apple-red.png',
  '/apple-turquoise.png',
  '/apple-white.png',
  '/apple-yellow.png',
  '/audio.mp3',
  '/script.js',
  '/index.html',
  '/style.html'
];

// Install and cache files
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Installing');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(FILES_TO_CACHE).catch(err => {
        console.error('Caching failed', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate and clean old caches
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activating');
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Serve cached files if offline
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
    .then(response => {
      return response || fetch(event.request)
        .then(fetchRes => {
          return fetchRes;
        });
    })
    .catch(() => {
      // Fallback: show support page if offline and request fails
      if (event.request.mode === 'navigate') {
        return caches.match('/index.html');
      }
    })
  );
});
