/* ReserveHub — PWA Service Worker */
const CACHE_NAME = 'reservehub-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/variables.css',
  './css/base.css',
  './css/layout.css',
  './css/components.css',
  './css/screens.css',
  './data/images.js',
  './data/constants.js',
  './data/discovery.js',
  './data/venues.js',
  './data/bookings.js',
  './components/icons.js',
  './components/dialogs.js',
  './components/chrome.js',
  './js/state.js',
  './js/router.js',
  './js/u01-home.js',
  './js/u02-search.js',
  './js/u03-shop-detail.js',
  './js/u04-calendar.js',
  './js/u05-booking-input.js',
  './js/u06-booking-confirm.js',
  './js/u07-booking-complete.js',
  './js/u08-mypage.js',
  './js/u09-booking-detail.js',
  './js/u10-profile.js',
  './js/app.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('PWA: Some assets failed to precache:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  // Handle HTTP GET requests
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in background to revalidate cache
        fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse.clone()));
          }
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });
        return response;
      }).catch(() => {
        // Fallback to cached index.html for navigation requests
        if (request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
