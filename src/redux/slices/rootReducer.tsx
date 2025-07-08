import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {reduxStorage} from '../../services/storage';
// import authSlice from './authSlice/authSlice';
import translationSlice from './translationSlice/translationSlice';

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['authState'],
  // debug:true
};

const rootReducer = combineReducers({
  // authState: authSlice,
  translationState: translationSlice,
});

export default persistReducer(persistConfig, rootReducer);
