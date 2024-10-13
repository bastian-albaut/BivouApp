import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBivouacById } from '../api/bivouacs';

export const fetchBivouacById = createAsyncThunk(
  'bivouacs/fetchBivouacById',
  async (id: number) => {
    return getBivouacById(id);
  }
);