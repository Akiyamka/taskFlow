import React from 'react';
import Header from 'Views/Header';
import AddTask from 'Views/AddTask';
import Footer from 'Views/Footer';
import TimeLine from 'Controls/TimeLine';
import Cards from 'Controls/Cards';
import style from './style.styl';

const MainView = () => (
  <div className={style.mainView}>
    <div className={style.view}>
      <Header />
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
