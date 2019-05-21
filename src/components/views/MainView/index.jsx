import React from 'react';
import Cards from '../../controls/Cards';
import Header from '../Header';
import AddTask from '../AddTask';
import Footer from '../Footer';
import TimeLine from '../../controls/TimeLine';
import './index.scss';

const MainView = () => {
  const start = (e) => e.preventDefault();
  const end = (e) => e.preventDefault();
  const move = (e) => e.preventDefault();
  return (
    <div
      id='main-view'
      onTouchStart={(e) => start(e)}
      onTouchEnd={(e) => end(e)}
      onTouchMove={(e) => move(e)}>
      <div id='view'>
        <Header />
        <TimeLine />
        <AddTask />
        <Cards />
      </div>
      <Footer />
    </div>
  );
};

export default MainView;
