import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import LogOut from 'Controls/LogOut';
import TimeLine from 'Controls/TimeLine';
import Cards from 'Controls/Cards';
import Header from 'Views/Header';
import AddTask from 'Views/AddTask';
import Footer from 'Views/Footer';
import firebase from '../../../dataBase/firebase';
import store from '../../../store/store';
import db from '../../../dataBase/indexDb';
import style from './style.styl';

const MainView = ({ history }) => {
  useEffect(() => {
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
            tasks.push({ ...val.data(), id: val.id })
            db.add({ ...val.data(), id: val.id });
          });
          store.setState({ tasks, lastIndex: tasks.length });
        }
      });
      else history.push('/taskFlow/login');
  }, []);

  return (
    <div className={style.mainView}>
      <div className={style.view}>
        <Header />
        <LogOut />
        <AddTask />
        <div className={style.taskList}>
          <TimeLine />
          <Cards />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withRouter(MainView);
