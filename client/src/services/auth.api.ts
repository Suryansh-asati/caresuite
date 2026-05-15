import axiosClient from '../shared/lib/axios';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
  bio?: string | null;
  preferredTheme?: string | null;
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

export type LoginData = { email: string; password: string };
export type RegisterData = { name: string; email: string; password: string };

export const authApi = {
  async register(data: RegisterData) {
    const response = await axiosClient.post('/auth/register', data);
    return response.data.data;
  },

  async login(data: LoginData) {
    const response = await axiosClient.post('/auth/login', data);
    return response.data.data;
  },

  async getMe(): Promise<User> {
    const response = await axiosClient.get('/auth/me');
    return response.data.data.user;
  },
};
