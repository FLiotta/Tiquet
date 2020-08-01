import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';
import Store from './store';
import { Provider } from 'react-redux';
import { reconnect } from './actions/session';
import AppRouter from './routes/AppRouter';
import './styles/Main.scss';

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