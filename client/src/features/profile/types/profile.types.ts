export interface Profile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  preferredTheme: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfilePayload {
  name: string;
  avatarUrl: string | null;
  bio: string | null;
  preferredTheme: string | null;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}
