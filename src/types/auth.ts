import type { UseFormReturnType } from "@mantine/form";

export interface AuthState {
  loggedIn: boolean;
  token: string | null;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  userId: number;
  username: string;
  email: string;
  firstName: string;
}

export interface RegisterValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  token: string;
  type: string;
  userId: number;
  username: string;
  email: string;
  firstName: string;
}

export interface LoginFormProps {
  form: UseFormReturnType<LoginValues>;
  handleSubmit: (values: LoginValues) => void;
  loading: boolean;
}
