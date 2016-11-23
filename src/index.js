import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container';
import {Provider} from 'react-redux';
import configureStore from './configure-store';

import 'normalize.css';
import 'reset-css/reset.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('root')
);
