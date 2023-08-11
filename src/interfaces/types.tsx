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
