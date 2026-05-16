import React, { useEffect, useState } from 'react';
import Button from '../../../shared/ui/Button';
import Input from '../../../shared/ui/Input';
import Textarea from '../../../shared/ui/Textarea';
import Select from '../../../shared/ui/Select';
import type { Profile, UpdateProfilePayload } from '../types/profile.types';

interface ProfileFormProps {
  profile: Profile | null;
  onSubmit: (payload: UpdateProfilePayload) => Promise<void>;
  isSaving?: boolean;
  submitLabel?: string;
}

const toInputValue = (value: string | null | undefined) => value ?? '';

export const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  onSubmit,
  isSaving = false,
  submitLabel = 'Save profile',
}) => {
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bio, setBio] = useState('');
  const [preferredTheme, setPreferredTheme] = useState('calm');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) {
      return;
    }

    setName(profile.name);
    setAvatarUrl(toInputValue(profile.avatarUrl));
    setBio(toInputValue(profile.bio));
    setPreferredTheme(profile.preferredTheme || 'calm');
  }, [profile]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedName = name.trim();

    if (!normalizedName) {
      setError('Name is required.');
      return;
    }

    setError(null);

    await onSubmit({
      name: normalizedName,
      avatarUrl: avatarUrl.trim() || null,
      bio: bio.trim() || null,
      preferredTheme: preferredTheme.trim() || null,
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <Input
        label="Full name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Your display name"
        autoComplete="name"
        required
      />

      <Input
        label="Avatar URL"
        value={avatarUrl}
        onChange={(event) => setAvatarUrl(event.target.value)}
        placeholder="https://..."
        autoComplete="url"
      />

      <Textarea
        label="Bio"
        value={bio}
        onChange={(event) => setBio(event.target.value)}
        placeholder="Share a short note about your wellness routine"
        rows={4}
      />

      <Select
        label="Preferred appearance"
        value={preferredTheme}
        onChange={(event) => setPreferredTheme(event.target.value)}
      >
        <option value="calm">Calm</option>
        <option value="light">Light</option>
        <option value="system">System default</option>
      </Select>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-end">
        <Button
          type="submit"
          isLoading={isSaving}
          className="rounded-full bg-emerald-600 px-5 py-2.5 text-white hover:bg-emerald-700 focus:ring-emerald-500"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
