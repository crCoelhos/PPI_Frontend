export interface AuthContextType {
  token: string;
  setToken: (token: string) => void;
  children: React.ReactNode;
}

export interface UserData {
  id: number;
  name: string;
  cpf: string;
  email: string;
  contact: string;
  birthdate: string;
  hireDate: string;
  roleId: number;
  is_active: boolean;
  photo: string;
  document: string;
  sex: string;
  expertiseId: number;
  createdAt: string;
  updatedAt: string;
  role: {
    name: string;
  };
}

export interface CustomerData {
  id: number;
  businessName: string;
  cnpj: string;
  contactName: string;
  contactCpf: string;
  isActive: boolean;
  size: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  contact: string;
  expertiseId: number;
  is_active: boolean;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof User;
  label: string;
  numeric: boolean;
}
export interface CustomersHeadCell {
  disablePadding: boolean;
  id: keyof CustomerData;
  label: string;
  numeric: boolean;
}