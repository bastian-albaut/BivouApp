import { apiClient } from '../../../common/api/index';

export const getUsers = async () => {
  return await apiClient('users');
};

export const getUserById = async (id: string) => {
  return await apiClient(`users/${id}`);
};

export const createUser = async (userData: any) => {
  return await apiClient('users', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: { 'Content-Type': 'application/json' },
  });
};

