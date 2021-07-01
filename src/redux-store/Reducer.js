import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import UserReducer from './reducers/userReducer';

// const customFormReducer = (state, action) => {
//   const reduxFormReducerState = reduxFormReducer(state, action);
//   return formReducer(reduxFormReducerState, action);
// };

// const persistedUserReducer = persistReducer(
//   { key: 'picard', storage, blacklist: ['password'] },
//   userReducer
// );

export default combineReducers({
  user: UserReducer,
});
