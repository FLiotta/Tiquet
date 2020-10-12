// Packages
import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';

// Project
import { GOOGLE_ANALYTICS_ID } from './config'; 
import Store from './store';
import { reconnect } from './actions/session';
import AppRouter from './routes/AppRouter';
import './app.scss';

const cookies = new Cookies();
const store = Store;
ReactGA.initialize(GOOGLE_ANALYTICS_ID);

if(cookies.get('token')) {
  store.dispatch(reconnect());
}

cookies.set('allowAnalytics', true);


ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
);