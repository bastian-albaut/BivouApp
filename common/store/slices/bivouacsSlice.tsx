import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBivouacs, getBivouacById, createBivouac } from '../../api/bivouac/bivouacs';

interface BivouacState {
  city: string | null;
  postalCode: string | null;
  street: string | null;
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
}

const initialState: BivouacState = {
  city: '',
  postalCode: '',
  street: '',
  latitude: '',
  longitude: '',
  name:'',
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
};

export const fetchBivouacs = createAsyncThunk('bivouacs/fetchBivouacs', async () => {
  const response = await getBivouacs();
  return response;
});

// export const fetchUserBivouacs = createAsyncThunk('bivouacs/fetchUserBivouacs', async () => {
//   const response = await getUserBivouacsTest();
//   return response;
// });

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
        // state.city = bivouac.address.city;
        // state.postalCode = bivouac.postalCode;
        // state.street = bivouac.street;
        // state.latitude = bivouac.latitude;
        // state.longitude = bivouac.longitude;
        // state.rental_type = bivouac.rental_type;
        // state.field_type = bivouac.field_type;
        // state.area = bivouac.area;
        // state.description = bivouac.description;
        // state.is_pmr = bivouac.is_pmr;
        // state.privacy = bivouac.privacy;
        // state.equipmentIds = bivouac.equipmentIds;
        // state.price = bivouac.price;
      })
      .addCase(fetchBivouacById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching bivouac by ID';
      // })
      // .addCase(fetchUserBivouacs.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(fetchUserBivouacs.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.data = action.payload;
      // })
      // .addCase(fetchUserBivouacs.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message || 'Error fetching user bivouacs';
      });
  },
});

export const { updateLocation, updateType, updateEquipments, updatePrice, resetBivouac } = bivouacSlice.actions;

export default bivouacSlice.reducer;
