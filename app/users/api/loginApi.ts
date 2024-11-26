//TO-DO: mettre dans une var d'env
const BASE_URL = 'http://ms-user.cluster-ig5.igpolytech.fr:8080/api';

export const loginApi = async (email: string, password: string): Promise<{ token: string; userId: number }> => {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });


  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return await response.json(); 
};


