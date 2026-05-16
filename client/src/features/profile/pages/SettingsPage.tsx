import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../shared/ui/Button';
import Card from '../../../shared/ui/Card';
import SectionHeader from '../../../shared/ui/SectionHeader';
import { useAuth } from '../../../context/AuthContext';
import { useProfile } from '../hooks/useProfile';
import SettingsSection from '../components/SettingsSection';
import ProfileForm from '../components/ProfileForm';
import PasswordForm from '../components/PasswordForm';
import PreferenceCard from '../components/PreferenceCard';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { profile, loading, error, savingProfile, savingPassword, saveProfile, changePassword } =
    useProfile();
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  const handleProfileSave = async (payload: Parameters<typeof saveProfile>[0]) => {
    await saveProfile(payload);
    setProfileMessage('Account information updated.');
  };

  const handlePasswordChange = async (payload: Parameters<typeof changePassword>[0]) => {
    await changePassword(payload);
    setPasswordMessage('Password updated successfully.');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading && !profile) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <Card className="w-full max-w-xl border border-white/80 bg-white/90 text-center shadow-lg">
          <p className="text-lg font-semibold text-slate-900">Loading settings</p>
          <p className="mt-2 text-sm text-slate-500">
            Preparing your account and wellness preferences.
          </p>
        </Card>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Card className="border border-red-200 bg-red-50/80 text-center shadow-sm">
          <p className="text-lg font-semibold text-red-900">Unable to load settings</p>
          <p className="mt-2 text-sm text-red-700">{error}</p>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div className="space-y-4">
          <SectionHeader
            title="Settings"
            subtitle="A centralized place to manage the account that holds your wellness history."
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="space-y-6">
            <SettingsSection
              title="Account information"
              description="Keep the core identity fields current for a cleaner, more personal experience."
            >
              <ProfileForm
                profile={profile}
                onSubmit={handleProfileSave}
                isSaving={savingProfile}
                submitLabel="Update account"
              />
              {profileMessage && <p className="mt-4 text-sm text-emerald-700">{profileMessage}</p>}
            </SettingsSection>

            <SettingsSection
              title="Password update"
              description="Protect your account with a password update when you need one."
            >
              <PasswordForm onSubmit={handlePasswordChange} isSaving={savingPassword} />
              {passwordMessage && (
                <p className="mt-4 text-sm text-emerald-700">{passwordMessage}</p>
              )}
            </SettingsSection>

            <SettingsSection
              title="Logout and security"
              description="Session control stays intentionally simple for now."
              action={
                <Button
                  onClick={handleLogout}
                  variant="secondary"
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 hover:border-emerald-200 hover:text-emerald-900"
                >
                  Logout
                </Button>
              }
            >
              <p className="text-sm leading-6 text-slate-500">
                Future account controls such as trusted devices or session history can live here
                without changing the shape of this page.
              </p>
            </SettingsSection>
          </div>

          <div className="space-y-6">
            <SettingsSection
              title="Wellness preferences"
              description="These are intentionally lightweight placeholders for later personalization work."
            >
              <div className="grid gap-4">
                <PreferenceCard
                  title="Meditation prompt style"
                  value="Gentle and encouraging"
                  description="Keep the tone soft and user-centered."
                  tone="accent"
                />
                <PreferenceCard
                  title="Favorite library areas"
                  value="Yoga and audio therapy"
                  description="Useful as a future shortcut for curated recommendations."
                />
                <PreferenceCard
                  title="Daily check-in"
                  value="Evening reflection"
                  description="Placeholder for a future notification or habit preference."
                  tone="muted"
                />
              </div>
            </SettingsSection>

            <SettingsSection
              title="Appearance"
              description="A calm visual system without adding a full theme engine yet."
            >
              <div className="space-y-3 text-sm text-slate-600">
                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="font-medium text-slate-900">Current appearance</p>
                  <p className="mt-1">{profile.preferredTheme || 'Calm default'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="font-medium text-slate-900">Notification posture</p>
                  <p className="mt-1">Minimal, supportive, and future-ready.</p>
                </div>
              </div>
            </SettingsSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
