/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
/* eslint-disable no-restricted-globals */
import firebase from 'firebase/app';

const CACHE = 'cache-update-and-refresh-v1';

const getIdToken = () => {
  return new Promise((resolve) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      if (user) {
        user.getIdToken().then(
          (idToken) => {
            resolve(idToken);
          },
          () => {
            self.location = '/login';
          }
        );
      } else {
        self.location = '/login';
      }
    });
  });
};

const getOriginFromUrl = (url) => {
  const pathArray = url.split('/');
  const protocol = pathArray[0];
  const host = pathArray[2];
  return `${protocol}//${host}`;
};

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
  return self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      // Подробнее про ETag можно прочитать тут
      // https://en.wikipedia.org/wiki/HTTP_ETag
      const message = {
        type: 'refresh',
        url: response.url,
        eTag: response.headers.get('ETag'),
      };
      // Уведомляем клиент об обновлении данных.
      client.postMessage(JSON.stringify(message));
    });
  });
}

const urlsToCache = [
  '/index.html',
  '/bundle.js',
  '/src/manifest.json',
  '/src/icon.png',
  '/src/fonts/PT Root UI_Regular.css',
  '/src/fonts/PT Root UI_Regular.woff2',
];

self.addEventListener('fetch', (event) => {
  let req = event.request;
  const requestProcessor = (idToken) => {
    if (
      self.location.origin === getOriginFromUrl(event.request.url) &&
      (self.location.protocol === 'https:' || self.location.hostname === 'localhost') &&
      idToken
    ) {
      const headers = new Headers();
      for (const entry of req.headers.entries()) {
        headers.append(entry[0], entry[1]);
      }

      headers.append('Authorization', `Bearer ${idToken}`);
      try {
        req = new Request(req.url, {
          method: req.method,
          headers,
          mode: 'same-origin',
          credentials: req.credentials,
          cache: req.cache,
          redirect: req.redirect,
          referrer: req.referrer,
          body: req.body,
          bodyUsed: req.bodyUsed,
          context: req.context,
        });
      } catch (e) {
        console.log(e);
      }
    }
    return fetch(req).catch(console.log);
  };

  if (req.url.includes('google')) {
    event.respondWith(
      getIdToken()
        .then(requestProcessor, requestProcessor)
        .catch(console.log)
    );
  } else {
    event.respondWith(fromCache(event.request));
    event.waitUntil(
      update(event.request)
        // В конце, после получения "свежих" данных от сервера уведомляем всех клиентов.
        .then(refresh)
    );
  }
});

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(urlsToCache)));
});

// self.addEventListener('offline', (event) => {
//   event.respondWith(
//     caches
//       .open(CACHE)
//       .then((cache) => cache.match(event.request).then((matching) => matching || Promise.reject('no-match')))
//   );
// });

// self.addEventListener('sync', function(event) {
//   if (event.tag == 'myFirstSync') {
//     event.waitUntil(doSomeStuff());
//   }
// });

// self.addEventListener('activate', () => {
// const cacheWhitelist = [CACHE];
// event.waitUntil(
//   caches.keys().then((cacheNames) =>
//     Promise.all(
//       cacheNames.map((cacheName) => {
//         if (cacheWhitelist.indexOf(cacheName) === -1) {
//           return caches.delete(cacheName);
//         }
//       })
//     )
//   )
// clients.claim()
// );
// });
