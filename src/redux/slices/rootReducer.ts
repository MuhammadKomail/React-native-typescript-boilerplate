import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translationReducer from './translationSlice/translationSlice';
import authReducer from './authSlice/authSlice';

// Persist config for auth
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user', 'token'], // only persist these fields
};

const rootReducer = combineReducers({
  translationState: translationReducer,
  auth: persistReducer(authPersistConfig, authReducer),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
