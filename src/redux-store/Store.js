import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import sagaMiddlewareFactory from 'redux-saga';
import thunk from 'redux-thunk';
import appReducer from './Reducer';
import rootSaga from './sagas';
import { SIGN_OUT } from '../constant';

let enhancedCompose = compose;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  enhancedCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

export function configureStore(initialState = {}) {
  const middleware = [];
  const enhancers = [];

  const sagaMiddleware = sagaMiddlewareFactory();
  middleware.push(sagaMiddleware);
  middleware.push(thunk);
  enhancers.push(applyMiddleware(...middleware));

  const mainReducer = (state, action) => {
    if (action.type === SIGN_OUT) {
      return {};
    }
    return appReducer(state, action);
  };

  const store = createStore(
    mainReducer,
    initialState,
    enhancedCompose(...enhancers)
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
}

export const { store, persistor } = configureStore();
