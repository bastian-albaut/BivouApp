export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';
  const response = await fetch(`${baseUrl}/${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`Error: ${response.body}`);
  }
  return await response.json();
};
