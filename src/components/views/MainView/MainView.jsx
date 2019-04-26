import React, { Fragment } from 'react';
import Header from '../Header/Header';
import './MainView.scss';
import AddTask from '../../controlls/AddTask/AddTask';

const MainView = () => (
  <Fragment>
    <Header />
    <AddTask />
    {/* <Footer /> */}
  </Fragment>
);

export default MainView;
