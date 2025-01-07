export interface Endereco {
  id: number;
  street: string;
  streetName: string;
  buildingNumber: string;
  city: string;
  zipcode: string;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
}

export interface Contato {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  birthday: string;
  gender: string;
  address: Endereco;
  website: string;
  image: string;
}

export interface Empresa {
  id: number;
  name: string;
  email: string;
  vat: string;
  phone: string;
  country: string;
  addresses: Endereco[];
  website: string;
  image: string;
  contact: Contato;
}

export interface RespostaApi {
  status: string;
  code: number;
  locale: string;
  seed: string | null;
  total: number;
  data: Empresa[];
}
