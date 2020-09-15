// Packages
import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';
import { Provider } from 'react-redux';

// Project
import Store from './store';
import { reconnect } from './actions/session';
import AppRouter from './routes/AppRouter';
import './app.scss';

const cookies = new Cookies();
const store = Store;

if(cookies.get('token')) {
  store.dispatch(reconnect());
}


ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
);