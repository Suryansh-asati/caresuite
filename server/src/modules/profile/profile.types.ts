export interface ProfileRecord {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  preferredTheme: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateProfileInput {
  name: string;
  avatarUrl?: string | null;
  bio?: string | null;
  preferredTheme?: string | null;
}

export interface UpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
}
