import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers, getUserById, putUser } from '../../api/user/users';

interface UsersState {
  data: any[]; // All users (if needed for another feature)
  selectedUser: any | null; // The single user data for the logged-in user
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  data: [],
  selectedUser: null,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await getUsers();
  return response;
});

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id: number) => {
  const response = await getUserById(id);
  return response;
});

export const updateUser = createAsyncThunk('users/updateUser', async (userData: any) => {
  const response = await putUser(userData);
  return response;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching users';
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload; // Store single user in selectedUser
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching user';
      });
  },
});

export default usersSlice.reducer;
