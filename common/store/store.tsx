import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../../features/users/store/usersSlice';
import bivouacsReducer from '../../features/bivouacs/store/bivouacsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    bivouacs: bivouacsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
