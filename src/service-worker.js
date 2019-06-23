/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
// const isLocalhost = Boolean(
//   window.location.hostname === 'localhost' ||
//     window.location.hostname === '[::1]' ||
//     window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
// );

// function registerValidSW(swUrl, config) {
//   navigator.serviceWorker
//     .register(swUrl)
//     .then((registration) => {
//       registration.onupdatefound = () => {
//         const installingWorker = registration.installing;
//         if (installingWorker == null) {
//           return;
//         }
//         installingWorker.onstatechange = () => {
//           if (installingWorker.state === 'installed') {
//             if (navigator.serviceWorker.controller) {
//               console.log(
//                 'New content is available and will be used when all ' +
//                   'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
//               );

//               if (config && config.onUpdate) {
//                 config.onUpdate(registration);
//               }
//             } else {
//               console.log('Content is cached for offline use.');

//               if (config && config.onSuccess) {
//                 config.onSuccess(registration);
//               }
//             }
//           }
//         };
//       };
//     })
//     .catch((error) => {
//       console.error('Error during service worker registration:', error);
//     });
// }

// function checkValidServiceWorker(swUrl, config) {
//   fetch(swUrl)
//     .then((response) => {
//       const contentType = response.headers.get('content-type');
//       if (response.status === 404 || (contentType != null && contentType.indexOf('javascript') === -1)) {
//         navigator.serviceWorker.ready.then((registration) => {
//           registration.unregister().then(() => {
//             window.location.reload();
//           });
//         });
//       } else {
//         registerValidSW(swUrl, config);
//       }
//     })
//     .catch(() => {
//       console.log('No internet connection found. App is running in offline mode.');
//     });
// }

// export function register(config) {
//   if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
//     const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
//     if (publicUrl.origin !== window.location.origin) return;

//     window.addEventListener('load', () => {
//       const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

//       if (isLocalhost) {
//         checkValidServiceWorker(swUrl, config);

//         // Add some additional logging to localhost, pointing developers to the
//         // service worker/PWA documentation.
//         navigator.serviceWorker.ready.then(() => {
//           console.log(
//             'This web app is being served cache-first by a service ' +
//               'worker. To learn more, visit https://bit.ly/CRA-PWA'
//           );
//         });
//       } else {
//         // Is not localhost. Just register service worker
//         registerValidSW(swUrl, config);
//       }
//     });
//   }
// }

// export function unregister() {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.ready.then((registration) => {
//       registration.unregister();
//     });
//   }
// }

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

// Шлём сообщения об обновлении данных всем клиентам.
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

// При установке воркера мы должны закешировать часть данных (статику).
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(['/img/background'])));
});

// При запросе на сервер мы используем данные из кэша и только после идем на сервер.
self.addEventListener('fetch', (event) => {
  // Как и в предыдущем примере, сначала `respondWith()` потом `waitUntil()`
  event.respondWith(fromCache(event.request));
  event.waitUntil(
    update(event.request)
      // В конце, после получения "свежих" данных от сервера уведомляем всех клиентов.
      .then(refresh)
  );
});
