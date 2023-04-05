import { createAsyncThunk } from '@reduxjs/toolkit';

import { ArticleService, AuthService } from '@/services';
import { ApiUrlBuilder, getApiUrl } from '@/lib/apiUrlBuilder';
import { Article } from '@/interfaces/article.interface';

export const getArticle = createAsyncThunk<Article, string>('get article', async (id, thunkApi) => {
  try {
    return await ArticleService.getOne(id);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});