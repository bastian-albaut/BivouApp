import { apiClient } from '../index';

export const getUsers = async () => {
  return await apiClient('users');
};

export const getUserById = async (id: number, token: string) => {
  return await apiClient(`users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const putUser = async (userData: any, userId : number, token: string) => {
  return await apiClient(`users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
}