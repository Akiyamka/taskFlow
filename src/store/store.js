import createStore from 'unistore';
import devtools from 'unistore/devtools';
import firebase from '../dataBase/firebase';

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
  lastIndex: 0,
  notificationTask: {
    id: '',
    notification: false,
  },
};

const store =
  process.env.NODE_ENV === 'production' ? createStore(initialState) : devtools(createStore(initialState));

firebase.getTasks().then((querySnapshot) => {
  const tasks = [];
  [...querySnapshot.docs].map((val) => tasks.push({ ...val.data(), id: val.id }));
  store.setState({ tasks, lastIndex: tasks.length })
}).catch(console.log)

export default store;