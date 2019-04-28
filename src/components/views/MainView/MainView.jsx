import React, { Fragment } from 'react';
import Header from '../Header/Header';
import AddTask from '../../views/AddTask/AddTask';
import Cards from '../../controlls/Cards/Cards';
import Footer from '../Footer/Footer';
import './MainView.scss';

const MainView = () => {
  return (
    <Fragment>
      <div id='view'>
        <Header />
        <AddTask />
        <Cards />
      </div>
      <Footer />
    </Fragment>
  );
};

export default MainView;
