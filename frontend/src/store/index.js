import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './session';
import digReducer from './digs';
import bookingReducer from './bookings';
import reviewReducer from './reviews';
import userReducer from './users';

const rootReducer = combineReducers({
  session: sessionReducer,
  digs: digReducer,
  bookings: bookingReducer,
  reviews: reviewReducer,
  users: userReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
