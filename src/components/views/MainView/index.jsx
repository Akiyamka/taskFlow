import React from 'react';
import Header from 'Views/Header';
import AddTask from 'Views/AddTask';
import Footer from 'Views/Footer';
import TimeLine from 'Controls/TimeLine';
import Cards from 'Controls/Cards';
import './index.scss';

const MainView = () => (
  <div id='main-view'>
    <div id='view'>
      <Header />
      <AddTask />
      <div id='task-list'>
        <TimeLine />
        <Cards />
      </div>
    </div>
    <Footer />
  </div>
);

export default MainView;
