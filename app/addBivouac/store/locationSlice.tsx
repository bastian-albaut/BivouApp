import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Location {
  city: string;
  postalCode: string;
  street: string;
}

interface LocationState {
  locations: Location[];
}

const initialState: LocationState = {
  locations: [],
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    addLocation(state, action: PayloadAction<Location>) {
      state.locations.push(action.payload);
    },
    // Ajoutez d'autres reducers si nécessaire
  },
});

export const { addLocation } = locationSlice.actions;
export default locationSlice.reducer;