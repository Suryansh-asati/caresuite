import React from 'react';
import AvatarPlaceholder from './AvatarPlaceholder';
import type { Profile } from '../types/profile.types';

interface ProfileHeaderProps {
  profile: Profile;
}

const formatJoinDate = (dateValue: string) =>
  new Intl.DateTimeFormat(undefined, {
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateValue));

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  return (
    <section className="overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.2)]">
      <div className="bg-[linear-gradient(135deg,rgba(16,185,129,0.16)_0%,rgba(20,184,166,0.1)_50%,rgba(255,255,255,0)_100%)] px-6 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <AvatarPlaceholder name={profile.name} avatarUrl={profile.avatarUrl} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Personal profile
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {profile.name}
            </h2>
            <p className="mt-2 text-sm text-slate-500">{profile.email}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-900">
                Joined {formatJoinDate(profile.createdAt)}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Wellness-first account</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">
                {profile.preferredTheme || 'Calm default'} appearance
              </span>
            </div>
          </div>
        </div>
        {profile.bio && (
          <p className="mt-6 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            {profile.bio}
          </p>
        )}
      </div>
    </section>
  );
};

export default ProfileHeader;
