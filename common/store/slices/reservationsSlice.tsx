import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getReservations, getReservationById, createReservation } from '../../api/reservation/reservations';

interface ReservationsState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ReservationsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async () => {
  const response = await getReservations();
  return response;
});

export const fetchReservationById = createAsyncThunk('reservations/fetchReservationById', async (id: number) => {
  const response = await getReservationById(id);
  return response;
});

export const addReservation = createAsyncThunk('reservations/addReservation', async (bivouacData: any) => {
  const response = await createReservation(bivouacData);
  return response;
});

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching reservations';
      })
      .addCase(addReservation.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload); // Add the new reservation to the list
      })
      .addCase(addReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error creating reservation';
      });
  },
});


export default reservationsSlice.reducer;
