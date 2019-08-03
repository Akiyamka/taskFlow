import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faPen, faHeart, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'unistore/react';
import MainView from '../views/MainView';
import PageNotFound from '../views/PageNotFound';
import store from '../../store/store';
import FrameAdd from '../controls/FrameAdd';
import FrameEdit from '../controls/FrameEdit';

library.add(faPlus, faPen, faHeart, faCheck);

const Routing = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route exact path='/taskFlow' component={MainView} />
        <Route extra path='/taskFlow/add' component={FrameAdd} />
        <Route extra path='/taskFlow/edit/:id' component={FrameEdit} />
        <Route path='**' component={PageNotFound} />
      </Switch>
    </Provider>
  </BrowserRouter>
);

export default Routing;
