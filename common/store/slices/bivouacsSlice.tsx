import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllBivouacData } from '../../api/bivouac/bivouacsApi';

export interface BivouacState {
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
  photos: any[];
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
  photos: [],
  data: [],
  loading: false,
  error: null,
  status: 'idle',
};

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
    updatePhotos(state, action) {
      state.photos = action.payload.photos;
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

export const { updateLocation, updateType, updatePhotos, updateEquipments, updatePrice, resetBivouac } = bivouacSlice.actions;

export default bivouacSlice.reducer;
