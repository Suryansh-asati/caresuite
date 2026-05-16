import { useEffect, useState } from 'react';
import { profileApi } from '../api/profile.api';
import type { Profile, UpdatePasswordPayload, UpdateProfilePayload } from '../types/profile.types';

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Something went wrong while loading your profile.';

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setError(null);
        const profileData = await profileApi.getProfile();
        setProfile(profileData);
      } catch (requestError) {
        setError(getErrorMessage(requestError));
      } finally {
        setLoading(false);
      }
    };

    void loadProfile();
  }, []);

  const refreshProfile = async () => {
    try {
      setError(null);
      const profileData = await profileApi.getProfile();
      setProfile(profileData);
      return profileData;
    } catch (requestError) {
      const message = getErrorMessage(requestError);
      setError(message);
      throw new Error(message);
    }
  };

  const saveProfile = async (payload: UpdateProfilePayload) => {
    setSavingProfile(true);

    try {
      const profileData = await profileApi.updateProfile(payload);
      setProfile(profileData);
      return profileData;
    } finally {
      setSavingProfile(false);
    }
  };

  const changePassword = async (payload: UpdatePasswordPayload) => {
    setSavingPassword(true);

    try {
      return await profileApi.updatePassword(payload);
    } finally {
      setSavingPassword(false);
    }
  };

  return {
    profile,
    loading,
    error,
    savingProfile,
    savingPassword,
    refreshProfile,
    saveProfile,
    changePassword,
  };
};
