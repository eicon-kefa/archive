/* Lighthouse service worker — network-first, never poison asset caches */
const CACHE_NAME = 'lighthouse-v4';

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(() => undefined));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

function isCacheableRequest(request) {
  try {
    const url = new URL(request.url);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
    if (url.origin !== self.location.origin) return false;
    if (url.pathname.startsWith('/api')) return false;
    return true;
  } catch {
    return false;
  }
}

function shouldStoreResponse(request, response) {
  if (!response || !response.ok || response.type === 'opaque') return false;
  const url = new URL(request.url);
  const ct = (response.headers.get('content-type') || '').toLowerCase();
  // Never store HTML under a .js / .css / image URL (SPA fallback poison)
  if (/\.(js|mjs|css|png|jpg|jpeg|webp|svg|woff2?)$/i.test(url.pathname)) {
    if (ct.includes('text/html')) return false;
  }
  return true;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (!isCacheableRequest(request)) return;

  // Always take network for navigations so deploys aren't stuck on old shell
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => response)
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (shouldStoreResponse(request, response)) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone)).catch(() => {});
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
