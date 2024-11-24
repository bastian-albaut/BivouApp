export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  // const baseUrl = 'https://jsonplaceholder.typicode.com';
  const baseUrl = 'http://10.0.0.31:8080/api';
  //const baseUrl = 'http://localhost:8080/api';
  const response = await fetch(`${baseUrl}/${endpoint}`, options);
  // const response = await fetch(`${baseUrl}/users`, options);
  if (!response.ok) {
    throw new Error(`Error: ${response.body}`);
  }
  return await response.json();
};
