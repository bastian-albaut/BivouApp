import { apiClient } from '../index';
import { getToken } from '../../utils/authStorage';

export const getFavouriteByUserId = async (id: number) => {
  return await apiClient(`favourites/${id}`, {
    headers: { Authorization: `Bearer ${await getToken()}` },
  });
};

export const addFavourite = async (data: any) => {
  return await apiClient('favourites', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${await getToken()}` },
  });
};

export const deleteFavourite = async (data: any) => {
  return await apiClient('favourites', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${await getToken()}` },
  });
};
