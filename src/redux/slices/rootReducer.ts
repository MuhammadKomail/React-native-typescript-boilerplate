import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import translationReducer from './translationSlice/translationSlice';
import authReducer from './authSlice/authSlice';
import {reduxStorage} from '../../services/storage';

// Persist config for auth
const authPersistConfig = {
  key: 'auth',
  storage: reduxStorage,
  whitelist: ['user', 'token'], // only persist these fields
};

const rootReducer = combineReducers({
  translationState: translationReducer,
  auth: persistReducer(authPersistConfig, authReducer),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
