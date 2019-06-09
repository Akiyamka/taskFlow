import Dexie from 'dexie';
import 'babel-polyfill';

const db = new Dexie('taasksDB');

db.version(1).stores({
  tasks: 'id, name, text, status, index',
});

export default {
  getAll: async () => {
    const b = [];
    await db.transaction('rw', db.tasks, (e) => {
      e.db.tasks.each((contact) => b.push(contact));
    });
    return b;
  },
  add: (data) => {
    db.transaction('rw', db.tasks, (e) => {
      e.db.tasks.add(data);
    });
  },
  put: (data) => {
    db.transaction('rw', db.tasks, (e) => {
      e.db.tasks.put({ ...data });
    });
  },
  delete: (id) => {
    db.transaction('rw', db.tasks, (e) => {
      e.db.tasks.delete(id);
    });
  },
};
