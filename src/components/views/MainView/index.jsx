import React from 'react';
import Cards from '../../controls/Cards';
import Header from '../Header';
import AddTask from '../AddTask';
import Footer from '../Footer';
import './index.scss';

const MainView = () => {
  return (
    <>
      <div id='view'>
        <Header />
        <AddTask />
        <Cards />
      </div>
      <Footer />
    </>
  );
};

export default MainView;
