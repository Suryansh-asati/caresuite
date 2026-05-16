import React, { useState } from 'react';
import Button from '../../../shared/ui/Button';
import Input from '../../../shared/ui/Input';
import type { UpdatePasswordPayload } from '../types/profile.types';

interface PasswordFormProps {
  onSubmit: (payload: UpdatePasswordPayload) => Promise<void>;
  isSaving?: boolean;
}

export const PasswordForm: React.FC<PasswordFormProps> = ({ onSubmit, isSaving = false }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(null);

    await onSubmit({ currentPassword, newPassword });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <Input
        label="Current password"
        type="password"
        value={currentPassword}
        onChange={(event) => setCurrentPassword(event.target.value)}
        autoComplete="current-password"
        required
      />

      <Input
        label="New password"
        type="password"
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
        autoComplete="new-password"
        required
      />

      <Input
        label="Confirm new password"
        type="password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        autoComplete="new-password"
        required
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-end">
        <Button
          type="submit"
          isLoading={isSaving}
          className="rounded-full bg-slate-900 px-5 py-2.5 text-white hover:bg-slate-800 focus:ring-slate-500"
        >
          Update password
        </Button>
      </div>
    </form>
  );
};

export default PasswordForm;
