import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllBivouacData, getBivouacById, getBivouacs } from '../../api/bivouac/bivouacsApi';
import { CombinedBivouac } from './type';

interface BivouacState {
  num: string | null;
  street: string | null;
  city: string | null;
  postalCode: string | null;
  latitude: string | null;
  longitude: string | null;
  name: string;
  rental_type: string | null;
  field_type: string | null;
  area: number | null;
  description: string;
  is_pmr: boolean;
  privacy: string;
  price: number;
  equipmentIds: any[];
  data: any[];
  loading: boolean;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: BivouacState = {
  num: '',
  street: '',
  city: '',
  postalCode: '',
  latitude: '',
  longitude: '',
  name: '',
  rental_type: '',
  field_type: '',
  area: 0,
  description: '',
  is_pmr: false,
  privacy: '',
  price: 0,
  equipmentIds: [],
  data: [],
  loading: false,
  error: null,
  status: 'idle',
};

export const fetchBivouacs = createAsyncThunk('bivouacs/fetchBivouacs', async () => {
  const response = await getBivouacs();
  return response;
});

export const fetchBivouacById = createAsyncThunk('bivouacs/fetchBivouacById', async (id: number) => {
  const response = await getBivouacById(id);
  return response;
});

const bivouacSlice = createSlice({
  name: 'bivouac',
  initialState,
  reducers: {
    updateLocation(state, action) {
      const { num, street, city, postalCode, latitude, longitude } = action.payload;
      state.num = num;
      state.street = street;
      state.city = city;
      state.postalCode = postalCode;
      state.latitude = latitude;
      state.longitude = longitude;
    },
    updateType(state, action) {
      const { name, rental_type, field_type, area, description, is_pmr } = action.payload;
      state.name = name;
      state.rental_type = rental_type;
      state.field_type = field_type;
      state.area = area;
      state.description = description;
      state.is_pmr = is_pmr;
    },
    updateEquipments(state, action) {
      state.equipmentIds = action.payload.equipmentIds;
    },
    updatePrice(state, action) {
      const { privacy, price } = action.payload;
      state.privacy = privacy;
      state.price = price;
    },
    resetBivouac(state) {
      return initialState;
    },
  },
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
      })
      .addCase(fetchBivouacById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBivouacById.fulfilled, (state, action) => {
        state.loading = false;
        const bivouac = action.payload;
      })
      .addCase(fetchBivouacById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching bivouac by ID';
      })
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

export const { updateLocation, updateType, updateEquipments, updatePrice, resetBivouac } = bivouacSlice.actions;

export default bivouacSlice.reducer;
