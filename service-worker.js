/*
  Keel service worker.
  Bump CACHE_VERSION on every deploy so returning visitors pick up the new
  build instead of a stale cached copy. This is the same versioned
  cache-busting pattern used by Jarful.
*/
/*
  Keel service worker.
  Bump CACHE_VERSION on every deploy so returning visitors pick up the new
  build instead of a stale cached copy. This is the same versioned
  cache-busting pattern used by Jarful.

  New service worker versions install but wait rather than activating
  immediately, so the app can show an "update available" notice and let
  the person choose when to refresh (or apply it automatically if they've
  turned that on in Settings) instead of silently going stale until a hard
  refresh.
*/
const CACHE_VERSION = 'keel-cache-v4';

const APP_SHELL = [
  './',
  './index.html',
  './mobile.html',
  './manifest.json',
  './manifest-mobile.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first for navigations/HTML so app updates show up promptly;
// cache-first fallback for everything else so the shell still works offline.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
