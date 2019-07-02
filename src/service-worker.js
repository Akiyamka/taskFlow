const CACHE = 'cache-update-and-refresh-v1';

function fromCache(request) {
  return caches
    .open(CACHE)
    .then((cache) => cache.match(request).then((matching) => matching || Promise.reject('no-match')));
}

function update(request) {
  return caches
    .open(CACHE)
    .then((cache) =>
      fetch(request).then((response) => cache.put(request, response.clone()).then(() => response))
    );
}

function refresh(response) {
  return self.clients.matchAll().then();
}

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(['/img'])));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fromCache(event.request));
  event.waitUntil(
    update(event.request)
      .then(refresh)
  );
});
