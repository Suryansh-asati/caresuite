export interface UserPayload {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: UserPayload;
    token: string;
  };
}
