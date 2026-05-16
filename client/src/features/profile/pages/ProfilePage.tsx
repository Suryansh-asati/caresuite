import React, { useMemo, useState } from 'react';
import Card from '../../../shared/ui/Card';
import SectionHeader from '../../../shared/ui/SectionHeader';
import { useAuth } from '../../../context/AuthContext';
import { useProfile } from '../hooks/useProfile';
import ProfileHeader from '../components/ProfileHeader';
import ProfileStats from '../components/ProfileStats';
import PreferenceCard from '../components/PreferenceCard';
import SettingsSection from '../components/SettingsSection';
import ProfileForm from '../components/ProfileForm';

const formatDate = (dateValue: string) =>
  new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateValue));

export const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const { profile, loading, error, savingProfile, saveProfile } = useProfile();
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const mergedProfile = profile
    ? profile
    : currentUser
      ? {
          ...currentUser,
          avatarUrl: currentUser.avatarUrl ?? null,
          bio: currentUser.bio ?? null,
          preferredTheme: currentUser.preferredTheme ?? null,
          createdAt: currentUser.createdAt ?? new Date().toISOString(),
          updatedAt: currentUser.createdAt ?? new Date().toISOString(),
        }
      : null;

  const stats = useMemo(
    () => [
      {
        label: 'Wellness streak',
        value: '12 days',
        description: 'Placeholder for the next iteration of personal progress tracking.',
      },
      {
        label: 'Favorite focus',
        value: 'Calm evenings',
        description: 'Based on your current profile vibe and session habits.',
      },
      {
        label: 'Recent note',
        value: 'More consistency',
        description: 'A gentle reminder of what your account is oriented around.',
      },
      {
        label: 'Member since',
        value: mergedProfile ? formatDate(mergedProfile.createdAt) : '---',
        description: 'When your CareSuite account first became part of the platform.',
      },
    ],
    [mergedProfile]
  );

  const handleProfileSave = async (payload: Parameters<typeof saveProfile>[0]) => {
    await saveProfile(payload);
    setSaveMessage('Profile updated successfully.');
  };

  if (loading && !mergedProfile) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <Card className="w-full max-w-xl border border-white/80 bg-white/90 text-center shadow-lg">
          <p className="text-lg font-semibold text-slate-900">Loading your profile</p>
          <p className="mt-2 text-sm text-slate-500">
            We’re preparing your personal wellness space.
          </p>
        </Card>
      </div>
    );
  }

  if (error && !mergedProfile) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Card className="border border-red-200 bg-red-50/80 text-center shadow-sm">
          <p className="text-lg font-semibold text-red-900">Unable to load your profile</p>
          <p className="mt-2 text-sm text-red-700">{error}</p>
        </Card>
      </div>
    );
  }

  if (!mergedProfile) {
    return null;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <ProfileHeader profile={mergedProfile} />

        <div className="space-y-4">
          <SectionHeader
            title="Personal wellness snapshot"
            subtitle="A quiet overview of the habits and signals that make the experience feel more yours."
          />
          <ProfileStats stats={stats} />
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <SettingsSection
            title="Edit profile"
            description="Keep your account details current and shape the tone of your space."
          >
            <ProfileForm
              profile={mergedProfile}
              onSubmit={handleProfileSave}
              isSaving={savingProfile}
              submitLabel="Save profile changes"
            />
            {saveMessage && <p className="mt-4 text-sm text-emerald-700">{saveMessage}</p>}
          </SettingsSection>

          <div className="space-y-6">
            <SettingsSection
              title="Wellness summary"
              description="Current placeholders for a future personal dashboard layer."
            >
              <div className="grid gap-4">
                <PreferenceCard
                  title="Mood streak"
                  value="7 day calm streak"
                  description="A lightweight indicator of steadier usage and emotional rhythm."
                  tone="accent"
                />
                <PreferenceCard
                  title="Favorite categories"
                  value="Breathing, yoga, journaling"
                  description="Representative categories that can become more adaptive later."
                />
              </div>
            </SettingsSection>

            <SettingsSection
              title="Account details"
              description="Small account facts that help the product feel owned, not anonymous."
            >
              <div className="space-y-3 text-sm text-slate-600">
                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="font-medium text-slate-900">Email</p>
                  <p className="mt-1">{mergedProfile.email}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="font-medium text-slate-900">Bio</p>
                  <p className="mt-1">{mergedProfile.bio || 'No bio added yet.'}</p>
                </div>
              </div>
            </SettingsSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
