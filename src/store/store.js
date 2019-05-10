import createStore from 'unistore';
import database from '../dataBase/db';

const store = createStore({
  edit: [],
  tasks: [],
  timeLine: {
    start: ['00', '00'],
    end: ['23', '59'],
  },
});

database.getAll().then((tasks) => store.setState({ tasks }));

export default store;
