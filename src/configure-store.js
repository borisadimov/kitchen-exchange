import rootReducer from './rootReducer';
import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);


export default (initialState) => {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
};
