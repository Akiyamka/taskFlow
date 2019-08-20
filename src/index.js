import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import Routing from './components/routing';
import './index.styl';
import store from './store/store';

const collection = localStorage.getItem('id');
if (collection)
  firebase
    .getTasks(collection)
    .then((querySnapshot) => {
      const tasks = [];
      [...querySnapshot.docs].map((val) => tasks.push({ ...val.data(), id: val.id }));
      store.setState({ tasks, lastIndex: tasks.length });
    })
    .catch(() => {
      window.location = '/login';
    });
else window.location = '/login';

ReactDOM.render(<Routing />, document.getElementById('root'));
