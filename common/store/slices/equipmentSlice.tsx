import { getToken } from '@/common/utils/authStorage';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface EquipmentState {
  dataEquipment: any[]; // Liste des équipements
  loadingEquipment: boolean;
  errorEquipment: string | null;
  statusEquipment: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: EquipmentState = {
  dataEquipment: [],
  loadingEquipment: false,
  errorEquipment: null,
  statusEquipment: 'idle',
};

const BASE_URL = 'http://bivouapp-api-gateway.cluster-ig5.igpolytech.fr:8081';

const getHeaders = async () => {
  const token = await getToken(); 
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// Fetch asynchrone des équipements
export const fetchAllEquipments = createAsyncThunk(
  'equipments/fetchAllEquipments',
  async (_, { rejectWithValue }) => {
    try {
      const headers = await getHeaders();
      const equipments = await fetch(`${BASE_URL}/api/equipments`, { headers }).then((res) => res.json());
      return equipments;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch equipment data');
    }
  }
);

const equipmentSlice = createSlice({
  name: 'equipments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEquipments.pending, (state) => {
        state.statusEquipment = 'loading';
        state.loadingEquipment = true;
      })
      .addCase(fetchAllEquipments.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.statusEquipment = 'succeeded';
        state.loadingEquipment = false;
        state.dataEquipment = action.payload;
      })
      .addCase(fetchAllEquipments.rejected, (state, action) => {
        state.statusEquipment = 'failed';
        state.loadingEquipment = false;
        state.errorEquipment = action.payload as string;
      });
  },
});

export default equipmentSlice.reducer;
