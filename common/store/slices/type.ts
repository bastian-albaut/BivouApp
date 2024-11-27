// types.ts
export interface Bivouac {
  bivouacId: number;
  hostId: number;
  addressId: number;
  name: string;
  price: number;
  area: number;
  description: string;
  privacy: string;
  equipmentIds: any;
  rental_type: string;
  field_type: string;
  is_pmr: boolean;
}

export interface Address {
  addressId: number;
  number: string;
  street: string;
  city: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}

export interface Host {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  admin: boolean;
}

export interface Equipment {
  equipementId: number;
  label: string;
  icon: string;
}

export interface CombinedBivouac extends Bivouac {
  address: Address;
  host: Host;
  equipments: Equipment[];
}
