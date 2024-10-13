import { apiClient } from '../../../common/api/index';
import { mockBivouac } from './MockData';

export const getBivouacById = async (id: number) => {
  // return await apiClient(`bivouacs/${id}`);
  return mockBivouac
};