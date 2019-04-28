let idbSupported = false;
let db;
let transaction;
let store;

if ('indexedDB' in window) {
  idbSupported = true;
}

export default {
  create: new Promise( (res,rej) => {
    if (idbSupported) {
      const openRequest = indexedDB.open('tasksDB', 1);

      openRequest.onupgradeneeded = function(e) {
        db = e.target.result;

        if (!db.objectStoreNames.contains('tasks')) {
          db.createObjectStore('tasks');
        }
      };

      openRequest.onsuccess = function(e) {
        db = e.target.result;

        transaction = db.transaction(['tasks'], 'readwrite');
        store = transaction.objectStore('tasks');
        res(store.getAll());
      };

      openRequest.onerror = function(e) {
        console.dir(e);
      };
    }
  }),

  add: (data) => {
    transaction = db.transaction(['tasks'], 'readwrite');
    store = transaction.objectStore('tasks');
    store.add(data, data.id);
  },
  get: (id) => {
    transaction = db.transaction(['tasks'], 'readwrite');
    store = transaction.objectStore('tasks');
    return store.get(id);
  },
  getAll: () => {
    transaction = db.transaction(['tasks'], 'readwrite');
    store = transaction.objectStore('tasks');
    return store.getAll();
  },
  edit: (data) => {
    transaction = db.transaction(['tasks'], 'readwrite');
    store = transaction.objectStore('tasks');
    store.put(data, data.id);
  },
  delete: (id) => {
    transaction = db.transaction(['tasks'], 'readwrite');
    store = transaction.objectStore('tasks');
    store.delete(id);
  },
};
