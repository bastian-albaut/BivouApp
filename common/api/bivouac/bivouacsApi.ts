import { apiClient } from '../index';
import { getToken } from '../../utils/authStorage'
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://bivouapp-api-gateway.cluster-ig5.igpolytech.fr:8081';

const getHeaders = async () => {
  const token = await getToken(); 
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

      const [bivouacs, addresses, hosts, equipments, bivouacEquipments] = await Promise.all([
        fetch(`${BASE_URL}/api/bivouacs`, { headers }).then(res => res.json()),
        fetch(`${BASE_URL}/api/addresses`, { headers }).then(res => res.json()),
        fetch(`${BASE_URL}/api/users/hosts`, { headers }).then(res => res.json()),
        fetch(`${BASE_URL}/api/equipments`, { headers }).then(res => res.json()),
        fetch(`${BASE_URL}/api/bivouac-equipment`, { headers }).then(res => res.json()),
      ]);

      const combinedData = bivouacs.map((bivouac: { addressId: any; hostId: any; bivouacId: any; equipmentId: any; }) => ({
        ...bivouac,
        address: addresses.find((addr: { addressId: any; }) => addr.addressId === bivouac.addressId),
        host: hosts.find((user: { user_id: any; }) => user.user_id === bivouac.hostId),
        equipments: bivouacEquipments
          .filter((be: { bivouacId: any; }) => be.bivouacId === bivouac.bivouacId)
          .map((be: { equipmentId: any; }) => {
            const equipment = equipments.find((eq: { equipmentId: any; }) => eq.equipmentId === be.equipmentId);
            return equipment;
          }),
      }));

      return combinedData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch bivouac data');
    }
  }
);


export const createAddress = async (addressData: any) => {
  try {
    const response = await apiClient('addresses', {
      method: 'POST',
      body: JSON.stringify(addressData),
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

export const isUserHost = async (userId : string, token: string) => {
  return await apiClient(`users/setHost/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

}

export const deleteBivouac = async (bivouacId: string) => {
  try {
    const response = await apiClient(`bivouacs/${bivouacId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error('Error deleting bivouac:', error);
    throw error;
  }
}