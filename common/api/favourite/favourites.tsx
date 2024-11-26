import { apiClient } from '../index';

export const getFavouriteByUserId = async (id: number) => {
  return await apiClient(`favourites/${id}`);
};

export const addFavourite = async (data: any) => {
  return await apiClient('favourites', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
};

export const deleteFavourite = async (data: any) => {
  return await apiClient('favourites', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
};
