import React from 'react';
import Header from 'Views/Header';
import AddTask from 'Views/AddTask';
import Footer from 'Views/Footer';
import TimeLine from 'Controls/TimeLine';
import Cards from 'Controls/Cards';
import style from './index.styl';

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
