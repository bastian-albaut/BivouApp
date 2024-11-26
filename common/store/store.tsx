import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import bivouacsReducer from './slices/bivouacsSlice';
import favouritesReducer from './slices/favouritesSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    bivouacs: bivouacsReducer,
    favourites: favouritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
