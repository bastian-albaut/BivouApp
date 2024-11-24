import axios from 'axios';

//TO-DO: mettre dans une var d'env
const BASE_URL = 'http://ms-user.cluster-ig5.igpolytech.fr:8080/api';

export const loginApi = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed');
    } else {
      throw new Error('Login failed');
    }
  }
};

