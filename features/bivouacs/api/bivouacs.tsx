import { apiClient } from '../../../common/api/index';

export const getBivouacs = async () => {
  // return await apiClient('bivouacs');

  // Mock data for bivouacs
  const mockBivouacs = [
    {
      id: 1,
      name: "Mountain View Bivouac",
      description: "A peaceful place to camp with a stunning view of the mountains.",
      price: 45,
      locationType: "mountain",
      fieldType: "grassy",
      host: {
        userId: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
      },
      address: {
        number: "123",
        street: "Mountain Road",
        city: "Highlands",
        postalCode: "12345",
      },
      coordinates: {
        latitude: 40.7128,
        longitude: -74.0060,
      },
      imageUrl: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      name: "Lakeside Bivouac",
      description: "A perfect spot next to a calm lake for a relaxing camping experience.",
      price: 35,
      locationType: "lake",
      fieldType: "sandy",
      host: {
        userId: 2,
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone: "987-654-3210",
      },
      address: {
        number: "456",
        street: "Lake Street",
        city: "River City",
        postalCode: "67890",
      },
      coordinates: {
        latitude: 34.0522,
        longitude: -118.2437,
      },
      imageUrl: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      name: "Forest Retreat Bivouac",
      description: "Experience the tranquility of nature with this forest retreat camping site.",
      price: 50,
      locationType: "forest",
      fieldType: "wooded",
      host: {
        userId: 3,
        name: "Alice Johnson",
        email: "alicejohnson@example.com",
        phone: "321-654-0987",
      },
      address: {
        number: "789",
        street: "Forest Lane",
        city: "Greenwood",
        postalCode: "34567",
      },
      coordinates: {
        latitude: 51.5074,
        longitude: -0.1278,
      },
      imageUrl: "https://picsum.photos/200/300",
    },
  ];

  return mockBivouacs;


};

export const getBivouacById = async (id: string) => {
  return await apiClient(`bivouacs/${id}`);
};

export const createBivouac = async (bivouacData: any) => {
  return await apiClient('bivouacs', {
    method: 'POST',
    body: JSON.stringify(bivouacData),
    headers: { 'Content-Type': 'application/json' },
  });
};
