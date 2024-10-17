import { apiClient } from '../../../common/api/index';
import { mockBivouacs } from './MockData';

export const getFavorites = async () => {
  // return await apiClient.get('/favorites');
  return mockBivouacs;
};