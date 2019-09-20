import createStore from 'unistore';
import devtools from 'unistore/devtools';

const startTime = localStorage.getItem('startTime') !== null ? localStorage.getItem('startTime').split(':') : [0, 0, 0, 0];
const start = new Date().setHours(...startTime, 0, 0);
const endTime = localStorage.getItem('endTime') !== null ? localStorage.getItem('endTime').split(':') : [23, 59, 0, 0];
const end = new Date().setHours(...endTime, 0, 0);

const initialState = {
  edit: [],
  tasks: [],
  timeLine: {
    start,
    end,
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

export default store;
