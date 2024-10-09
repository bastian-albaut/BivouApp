import { apiClient } from '../../../common/api/index';
import { mockBivouacs } from './MockData';

export const getBivouacs = async () => {
  // return await apiClient('bivouacs');
  return mockBivouacs;
};

export const getBivouacById = async (id: string) => {
  return await apiClient(`bivouacs/${id}`);
};

export const createBivouac = async (bivouacData: any) => {
  return await apiClient('bivouacs', {
    method: 'POST',
    body: JSON.stringify(bivouacData),
    headers: { 'Content-Type': 'application/json' },
  });
};
