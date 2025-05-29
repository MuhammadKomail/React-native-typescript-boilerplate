import { createAsyncThunk } from "@reduxjs/toolkit";
import { Article } from "../../../types/news.type";
import api from "../../../services/api";
import { reduxStorage } from "../../../services/storage";

export const fetchArticles = createAsyncThunk<Article[], void, { rejectValue: string }>('news/fetchArticles', async (_, { rejectWithValue }) => {
    try {
        const response = await api({
            method: 'GET',
            url: 'top-headlines?sources=techcrunch&apiKey=b5ff00fe77184fc48cd5d4f102ce1990',
          });
        const data = await response.data;
        return data.articles || [];
    } catch (e: any) {
        console.log('In fetchArticles Item Error', e);
        return rejectWithValue(e.message || 'Failed to fetch articles');
    }
});

export const searchArticles = createAsyncThunk<Article[], string, { rejectValue: string }>('news/searchArticles', async (query, { rejectWithValue }) => {
    try {
        const response = await api({
            method: 'GET',
            url: `everything?q=${query}&apiKey=b5ff00fe77184fc48cd5d4f102ce1990`,
          });
       const data = await response.data;
        return data.articles || [];
    } catch (e: any) {
        console.log('In searchArticles Item Error', e);
        return rejectWithValue(e.message || 'Failed to search articles');
    }
});

export const fetchArticlesFromStorage = createAsyncThunk<Article[], void, { rejectValue: string }>('news/fetchArticlesFromStorage', async (_, { rejectWithValue }) => {
    try {
        const articles = await reduxStorage.getItem('articles');
        return JSON.parse(articles) || [];
    } catch (e: any) {
        console.log('In fetchArticlesFromStorage Error', e);
        return rejectWithValue(e.message || 'Failed to fetch articles');
    }
});