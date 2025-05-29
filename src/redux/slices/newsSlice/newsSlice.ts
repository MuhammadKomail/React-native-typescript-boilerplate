import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticles, fetchArticlesFromStorage, searchArticles } from '../../actions/newsAction/newsAction';
import { Article } from '../../../types/news.type';
import { reduxStorage } from '../../../services/storage';

interface NewsState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}


const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
};




const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.loading = false;
        state.articles = action.payload;
        reduxStorage.setItem('articles', JSON.stringify(action.payload));
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(searchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchArticles.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(searchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(fetchArticlesFromStorage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticlesFromStorage.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticlesFromStorage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default newsSlice.reducer;
