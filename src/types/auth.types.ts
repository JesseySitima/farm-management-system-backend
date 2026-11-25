
export interface RegisterUserInput {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  role_id?: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface AuthenticatedUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  role_id: string;
  role_name: string;
}
