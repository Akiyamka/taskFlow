import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import MainView from '../views/MainView/MainView';
import PageNotFound from '../views/PageNotFound/PageNotFound';

library.add(faPlus);

const Routing = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={MainView} />
      {/* <Route extra path = '/add' component={} /> */}
      <Route path='**' component={PageNotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routing;
