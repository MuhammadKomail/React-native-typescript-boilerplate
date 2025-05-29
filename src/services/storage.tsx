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

// --- Bookmarks Utility ---
const BOOKMARKS_KEY = 'bookmarkedArticles';

export const getBookmarkedArticles = (): any[] => {
  const json = mmkv.getString(BOOKMARKS_KEY);
  if (!json) return [];
  try {
    return JSON.parse(json);
  } catch {
    return [];
  }
};

import bookmarkEvents from './bookmarkEvents';

export const addBookmark = (article: any) => {
  const bookmarks = getBookmarkedArticles();
  // Avoid duplicate by id
  if (!bookmarks.some((a: any) => a.title === article.title)) {
    bookmarks.push(article);
    mmkv.set(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    bookmarkEvents.emit('changed');
  }
};

export const removeBookmark = (title: string) => {
  const bookmarks = getBookmarkedArticles();
  const updated = bookmarks.filter((a: any) => a.title !== title);
  mmkv.set(BOOKMARKS_KEY, JSON.stringify(updated));
  bookmarkEvents.emit('changed');
};

export const isBookmarked = (title: string): boolean => {
  const bookmarks = getBookmarkedArticles();
  return bookmarks.some((a: any) => a.title === title);
};

export const clearBookmarks = () => {
  mmkv.delete(BOOKMARKS_KEY);
};
