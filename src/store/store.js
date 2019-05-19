import createStore from 'unistore';
import database from '../dataBase/db';

const store = createStore({
  edit: [],
  tasks: [],
  timeLine: {
    start: ['00', '00'],
    end: ['23', '59'],
  },
  maxIndex: 0,
  draggedItem: {},
});

database.getAll().then((tasks) => {
  store.setState({ tasks });
  tasks.map(({ index }) => {
    if (index > store.getState().maxIndex) store.setState({ maxIndex: index });
  });
});

export default store;
