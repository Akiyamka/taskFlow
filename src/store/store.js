import createStore from 'unistore';
import database from '../dataBase/db';

const store = createStore({
  edit: [],
  tasks: [],
  timeLine: {
    start: new Date().setHours(0, 0, 0, 0),
    end: new Date().setHours(23, 59, 0, 0),
  },
  currentTimeInterval: 0,
});

database.getAll().then((tasks) => store.setState({ tasks }));

export default store;
