import React from 'react';
import Header from '../Header';
import AddTask from '../AddTask';
import Footer from '../Footer';
import TimeLine from '../../controls/TimeLine';
import Cards from '../../controls/Cards';
import style from './style.styl';

const MainView = () => (
  <div id={style.mainView}>
    <div id={style.view}>
      <Header />
      <AddTask />
      <div id={style.taskList}>
        <TimeLine />
        <Cards />
      </div>
    </div>
    <Footer />
  </div>
);

export default MainView;
