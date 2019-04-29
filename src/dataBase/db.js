let idbSupported = false;
let db;
let store;
if ('indexedDB' in window) idbSupported = true;

export default {
  getAll: new Promise((rej) => {
    if (idbSupported) {
      const openRequest = indexedDB.open('tasksDB', 1);

      openRequest.onupgradeneeded = (e) => {
        db = e.target.result;
        if (!db.objectStoreNames.contains('tasks')) db.createObjectStore('tasks');
      };

      openRequest.onsuccess = function(e) {
        db = e.target.result;
        store = db.transaction(['tasks'], 'readwrite').objectStore('tasks');
        rej(store.getAll());
      };

      openRequest.onerror = (e) => {
        console.dir(e);
      };
    }
  }),
  add: (data) => {
    store = db.transaction(['tasks'], 'readwrite').objectStore('tasks');
    store.add(data, data.id);
  },
  get: (id) => {
    store = db.transaction(['tasks'], 'readwrite').objectStore('tasks');
    return store.get(id);
  },
  edit: (data) => {
    store = db.transaction(['tasks'], 'readwrite').objectStore('tasks');
    store.put(data, data.id);
  },
  delete: (id) => {
    store = db.transaction(['tasks'], 'readwrite').objectStore('tasks');
    store.delete(id);
  },
};
