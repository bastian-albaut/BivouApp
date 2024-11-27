import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import bivouacsReducer from './slices/bivouacsSlice';
import favouritesReducer from './slices/favouritesSlice';
import reservationsReducer from './slices/reservationsSlice';
import equipmentReducer from './slices/equipmentSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    bivouacs: bivouacsReducer,
    favourites: favouritesReducer,
    reservations: reservationsReducer,
    equipments: equipmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
