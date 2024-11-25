import axios from 'axios';

// TO-DO: Mettre cette valeur dans une variable d'environnement.
const BASE_URL = 'http://ms-user.cluster-ig5.igpolytech.fr:8080/api';

export const registerApi = async (email: string, password: string) => {
  console.log('Attempting to register with email:', email, password); // Log pour vérifier les données envoyées

  try {
    const response = await axios.post(`${BASE_URL}/users/register`, {
      email,
      password,
    });

    console.log('Response received:', response.data); // Log pour vérifier la réponse de l'API

    return 'Registration successful';
  } catch (error) {
    console.error('Error during registration:', error); // Log détaillé de l'erreur

    if (axios.isAxiosError(error)) {
      // Si l'erreur est liée à Axios, on logue la réponse d'erreur de l'API
      console.error('Axios error response:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Registration failed');
    } else {
      // Pour toute autre erreur (ex. réseau), on logue l'erreur générique
      console.error('Non-Axios error:', error);
      throw new Error('Registration failed');
    }
  }
};
