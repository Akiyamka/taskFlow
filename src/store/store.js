import createStore from 'unistore';
import database from '../dataBase/db';

const store = createStore({
  edit: [],
  tasks: [],
});

database.getAll().then((tasks) => store.setState({ tasks }));

export default store;
