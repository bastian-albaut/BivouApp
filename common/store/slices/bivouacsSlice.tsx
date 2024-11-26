import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllBivouacData } from '../../api/bivouac/bivouacsApi';
import { CombinedBivouac } from './type';


interface BivouacState {
  data: CombinedBivouac[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BivouacState = {
  data: [],
  status: 'idle',
  error: null,
};

const bivouacSlice = createSlice({
  name: 'bivouacs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBivouacData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBivouacData.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAllBivouacData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch bivouac data';
      });
  },
});

export default bivouacSlice.reducer;
