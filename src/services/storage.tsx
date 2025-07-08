import {MMKV} from 'react-native-mmkv';
import {Storage} from 'redux-persist';

// Initialize MMKV instance
export const mmkv = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    mmkv.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = mmkv.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    mmkv.delete(key);
    return Promise.resolve();
  },
};

// Add these new utility functions for auth token management
export const tokenStorage = {
  getToken: () => mmkv.getString('accessToken'),
  getRefreshToken: () => mmkv.getString('refreshToken'),
  saveToken: (token: string) => mmkv.set('accessToken', token),
  saveRefreshToken: (refreshToken: string) =>
    mmkv.set('refreshToken', refreshToken),
  clearTokens: () => {
    mmkv.delete('accessToken');
    mmkv.delete('refreshToken');
  },
};
