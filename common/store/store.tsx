import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import bivouacsReducer from './slices/bivouacsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    bivouacs: bivouacsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
