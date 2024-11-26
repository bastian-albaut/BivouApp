import { apiClient } from '../index';
import { mockBivouacs } from './MockData';
import { getToken } from '../../utils/authStorage'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Host, Address, Bivouac, CombinedBivouac } from '@/common/store/slices/type';

const BASE_URL = 'http://bivouapp-api-gateway.cluster-ig5.igpolytech.fr:8081';

const getHeaders = async () => {
  const token = await getToken(); // Récupère le token depuis le storage ou un autre endroit
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const fetchAllBivouacData = createAsyncThunk(
  'bivouacs/fetchAllBivouacData',
  async (_, { rejectWithValue }) => {
    try {
      const headers = await getHeaders();

      const [bivouacs, addresses, hosts] = await Promise.all([
        fetch(`${BASE_URL}/api/bivouacs`, { headers }).then(res => res.json()),
        fetch(`${BASE_URL}/api/addresses`, { headers }).then(res => res.json()),
        fetch(`${BASE_URL}/api/users/hosts`, { headers }).then(res => res.json()),
      ]);

      const combinedData = bivouacs.map((bivouac: { addressId: any; hostId: any; }) => ({
        ...bivouac,
        address: addresses.find((addr: { addressId: any; }) => addr.addressId === bivouac.addressId),
        host: hosts.find((user: { user_id: any; }) => user.user_id === bivouac.hostId),
      }));

      return combinedData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch bivouac data');
    }
  }
);


export const getBivouacById = async (id: number) => {
  // return await apiClient(`bivouacs/${id}`);
  return mockBivouacs;
};

export const createBivouac = async (bivouacData: any) => {
  try {
    const response = await apiClient('bivouacs', {
      method: 'POST',
      body: JSON.stringify(bivouacData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error('Error creating bivouac:', error);
    throw error;
  }
};

// export const getBivouacsTest = async () => {
//   const response = await axios.get(`${API_URL}/bivouacs`);
//   return response.data;
// };

// export const getUserBivouacsTest = async () => {
//   const response = await axios.get(`${API_URL}/user/bivouacs`);
//   return response.data;
// };

// export const getBivouacByIdTest = async (id: number) => {
//   const response = await axios.get(`${API_URL}/bivouacs/${id}`);
//   return response.data;
// };

// export const createBivouacTest = async (bivouac: any) => {
//   const response = await axios.post(`${API_URL}/bivouacs`, bivouac);
//   return response.data;
// };
