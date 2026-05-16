import axiosClient from '../../../shared/lib/axios';
import type { Profile, UpdatePasswordPayload, UpdateProfilePayload } from '../types/profile.types';

const unwrapProfile = (response: { data: { data: { profile: Profile } } }) =>
  response.data.data.profile;

export const profileApi = {
  async getProfile(): Promise<Profile> {
    const response = await axiosClient.get('/profile');
    return unwrapProfile(response);
  },

  async updateProfile(payload: UpdateProfilePayload): Promise<Profile> {
    const response = await axiosClient.patch('/profile', payload);
    return unwrapProfile(response);
  },

  async updatePassword(payload: UpdatePasswordPayload): Promise<string> {
    const response = await axiosClient.patch('/profile/password', payload);
    return response.data.data.message;
  },
};
