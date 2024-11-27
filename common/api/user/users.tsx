import { apiClient } from '../index';

export const getUsers = async () => {
  return await apiClient('users');
};

export const getUserById = async (id: number) => {
  return await apiClient(`users/${id}`);
};

export const putUser = async (userData: any) => {
  return await apiClient(`users/${userData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
}