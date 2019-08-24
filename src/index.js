import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './components/routing';
import firebase from './dataBase/firebase';
import store from './store/store';
import './style.styl';

const getDataFromFirebase = () => {
  const collection = localStorage.getItem('id');
  if (collection)
    firebase.getTasks(collection).then((querySnapshot) => {
      if (querySnapshot.metadata.fromCache) {
        db.getAll().then((cards) => {
          store.setState({ tasks: cards, lastIndex: cards.length });
        });
      } else {
        const tasks = [];
        [...querySnapshot.docs].map((val) => {
          tasks.push({ ...val.data(), id: val.id });
          db.add({ ...val.data(), id: val.id });
        });
        store.setState({ tasks, lastIndex: tasks.length });
      }
    });
};

setInterval(getDataFromFirebase, 120000);

window.onClose = () => {
  clearInterval(getDataFromFirebase);
};

ReactDOM.render(<Routing />, document.getElementById('root'));
