import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './authSlice/authSlice';
import newsReducer from './newsSlice/newsSlice';

// Persist config for auth
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user', 'token'], // only persist these fields
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  news: newsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
