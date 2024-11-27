import { apiClient } from '../index';

export const getReservations = async () => {
  return await apiClient('reservations');
};

export const getReservationById = async (id: number) => {
  return await apiClient(`reservations/${id}`);
};

export const createReservation = async (bivouacData: any) => {
  console.log('createReservation', bivouacData);
  return await apiClient('reservations', {
    method: 'POST',
    body: JSON.stringify(bivouacData),
    headers: { 'Content-Type': 'application/json' },
  });
};
