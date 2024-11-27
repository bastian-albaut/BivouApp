import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFavouriteByUserId, addFavourite, deleteFavourite } from '../../api/favourite/favourites';

interface FavouritesState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: FavouritesState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchFavouritesByUserId = createAsyncThunk('favourites/fetchFavourites', async (id: number) => {
  const response = await getFavouriteByUserId(id);
  return response;
});

export const newFavourite = createAsyncThunk('favourites/addFavourite', async (data: any) => {
  const response = await addFavourite(data);
  return response;
});

export const removeFavourite = createAsyncThunk('favourites/deleteFavourite', async (data: any) => {
  const response = await deleteFavourite(data);
  return response;
});

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavouritesByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavouritesByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFavouritesByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching favourites';
      })
      .addCase(newFavourite.pending, (state) => {
        state.loading = true;
      })
      .addCase(newFavourite.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(newFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error creating favourite';
      })
      .addCase(removeFavourite.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFavourite.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((favourite) => favourite.id !== action.payload.id);
      })
      .addCase(removeFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error deleting favourite';
      });
  },
});


export default favouritesSlice.reducer;
