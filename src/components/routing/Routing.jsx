import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from '../../redux/store';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faCertificate, faBookmark } from '@fortawesome/free-solid-svg-icons';
import Header from '../views/Header/Header';

// library.add(faCertificate, faBookmark);

const Routing = () => (
  <BrowserRouter>
    <Route component={Header} />
  </BrowserRouter>
);

export default Routing;
