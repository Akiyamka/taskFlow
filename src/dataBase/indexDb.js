import Dexie from 'dexie';

const db = new Dexie('taasksDB');
const requestDb = new Dexie('requestDB');

db.version(1).stores({
  tasks: 'id',
});

requestDb.version(1).stores({
  request: 'id',
})

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
    requestDb.transaction('rw', requestDb.request, (e) => {
      e.requestDb.request.add(request);
    });
  },
  getAllRequest: async () => {
    const b = [];
    await requestDb.transaction('rw', requestDb.request, (e) => {
      e.requestDb.request.each((contact) => b.push(contact));
    });
    return b;
  },
  clearRequst: ()=>{
    requestDb.transaction('rw', requestDb.request, (e) => {
      e.requestDb.request.clear();
    });
  }
};
