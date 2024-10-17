import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFavorites } from '../../../app/favorites/api/favorites';

interface FavoritesState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async () => {
  const response = await getFavorites();
  return response;
});

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching favorites';
      });
  },
});

export default favoritesSlice.reducer;
