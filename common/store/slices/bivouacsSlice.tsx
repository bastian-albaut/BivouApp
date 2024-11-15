import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBivouacs, getBivouacById, createBivouac } from '../../api/bivouac/bivouacs';

interface BivouacState {
  city: string;
  postalCode: string;
  street: string;
  latitude: string;
  longitude: string;
  name: string;
  rentalType: string;
  fieldType: string;
  area: string;
  description: string;
  isPMR: boolean;
  privacy: string;
  price: number;
  equipments: any[];
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: BivouacState = {
  city: '',
  postalCode: '',
  street: '',
  latitude: '',
  longitude: '',
  name:'',
  rentalType: '',
  fieldType: '',
  area: '',
  description: '',
  isPMR: false,
  privacy: '',
  price: 0,
  equipments: [],
  data: [],
  loading: false,
  error: null,
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
      const { city, postalCode, street, latitude, longitude } = action.payload;
      state.city = city;
      state.postalCode = postalCode;
      state.street = street;
      state.latitude = latitude;
      state.longitude = longitude;
    },
    updateType(state, action) {
      const { name, rentalType, fieldType, area, description, isPMR } = action.payload;
      state.name = name;
      state.rentalType = rentalType;
      state.fieldType = fieldType;
      state.area = area;
      state.description = description;
      state.isPMR = isPMR;
    },
    updateEquipments(state, action) {
      state.equipments = action.payload.equipments;
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
        // state.city = bivouac.address.city;
        // state.postalCode = bivouac.postalCode;
        // state.street = bivouac.street;
        // state.latitude = bivouac.latitude;
        // state.longitude = bivouac.longitude;
        // state.rentalType = bivouac.rentalType;
        // state.fieldType = bivouac.fieldType;
        // state.area = bivouac.area;
        // state.description = bivouac.description;
        // state.isPMR = bivouac.isPMR;
        // state.privacy = bivouac.privacy;
        // state.equipments = bivouac.equipments;
        // state.price = bivouac.price;
      })
      .addCase(fetchBivouacById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching bivouac by ID';
      });
  },
});

export const { updateLocation, updateType, updateEquipments, updatePrice, resetBivouac } = bivouacSlice.actions;

export default bivouacSlice.reducer;
