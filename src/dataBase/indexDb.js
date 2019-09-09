import Dexie from 'dexie';

const db = new Dexie('taasksDB');

db.version(1).stores({
  tasks: 'id, name, text, status, index',
  request: 'request',
});

export default {
  getAll: async () => {
    const b = [];
    await db.transaction('rw', db.tasks, (e) => {
      e.db.tasks.each((contact) => b.push(contact));
    });
    return b;
  },
  addAll: (tasks) => {
    db.transaction('rw', db.tasks, (e) => {
      e.db.tasks.add(...tasks);
    });
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
  clear: ()=> {
    db.transaction('rw', db.tasks, (e) => {
      e.db.tasks.clear();
    });
  },
  addRequest: (request) => {
    db.transaction('rw', db.request, (e) => {
      e.db.request.add(request);
    });
  },
  getAllRequest: async () => {
    const b = [];
    await db.transaction('rw', db.request, (e) => {
      e.db.request.each((contact) => b.push(contact));
    });
    return b;
  },
  clearRequst: ()=>{
    db.transaction('rw', db.request, (e) => {
      e.db.request.clear();
    });
  }
};
