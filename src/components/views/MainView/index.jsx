import React from 'react';
import Header from '../Header';
import AddTask from '../AddTask';
import Footer from '../Footer';
import TimeLine from '../../controls/TimeLine';
import Cards from '../../controls/Cards';
import LogOut from 'Controls/LogOut'
import style from './style.styl';

const MainView = () => (
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

export default MainView;
