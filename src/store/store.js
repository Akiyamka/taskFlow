import createStore from 'unistore';
import devtools from 'unistore/devtools';
import database from '../dataBase/db';

const initialState = {
  edit: [],
  tasks: [],
  timeLine: {
    start: new Date().setHours(0, 0, 0, 0),
    end: new Date().setHours(23, 59, 0, 0),
  },
  resize: {
    isResize: false,
  },
  currentTimeInterval: 0,
};

const store =
  process.env.NODE_ENV === 'production' ? createStore(initialState) : devtools(createStore(initialState));

database.getAll().then((tasks) => store.setState({ tasks }));
export default store;
