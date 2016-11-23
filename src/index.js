import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container';
import './index.css';
import {Provider} from 'react-redux';
import configureStore from './configure-store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('root')
);
