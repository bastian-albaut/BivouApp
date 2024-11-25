export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  // const baseUrl = 'https://jsonplaceholder.typicode.com';
  // const baseUrl = 'http://bivouapp-api-gateway.cluster-ig5.igpolytech.fr:8081/api'
  const baseUrl = 'http://bivouapp-ms-bivouac.cluster-ig5.igpolytech.fr:8080/api'
  //const baseUrl = 'http://localhost:8080/api';
  console.log(`${baseUrl}/${endpoint}`);
  const response = await fetch(`${baseUrl}/${endpoint}`, options);
  // const response = await fetch(`${baseUrl}/users`, options);
  if (!response.ok) {
    throw new Error(`Error: ${response.body}`);
  }
  return await response.json();
};
