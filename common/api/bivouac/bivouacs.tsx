import { apiClient } from '../index';
import { mockBivouacs } from './MockData';

export const getBivouacs = async () => {
  // return await apiClient('bivouacs');
  return mockBivouacs;
};

export const getBivouacById = async (id: number) => {
  // return await apiClient(`bivouacs/${id}`);
  return mockBivouacs;
};

export const createBivouac = async (bivouacData: any) => {
  return await apiClient('bivouacs', {
    method: 'POST',
    body: JSON.stringify(bivouacData),
    headers: { 'Content-Type': 'application/json' },
  });
};
