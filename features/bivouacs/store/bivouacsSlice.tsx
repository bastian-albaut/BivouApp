import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBivouacs, getBivouacById, createBivouac } from '../api/bivouacs';

interface BivouacsState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: BivouacsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchBivouacs = createAsyncThunk('bivouacs/fetchBivouacs', async () => {
  const response = await getBivouacs();
  return response;
});

const bivouacsSlice = createSlice({
  name: 'bivouacs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBivouacs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBivouacs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBivouacs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching bivouacs';
      });
  },
});

export default bivouacsSlice.reducer;
