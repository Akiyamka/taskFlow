import React from 'react';
import Cards from '../../controls/Cards';
import Header from '../Header';
import AddTask from '../AddTask';
import Footer from '../Footer';
import TimeLine from '../TimeLine';
import './index.scss';

const MainView = () => (
  <div id='main-view'>
    <div id='view'>
      <Header />
      <TimeLine />
      <AddTask />
      <Cards />
    </div>
    <Footer />
  </div>
);

export default MainView;
