import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import bivouacsReducer from './slices/bivouacsSlice';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    bivouacs: bivouacsReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
