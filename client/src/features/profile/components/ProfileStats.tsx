import React from 'react';

interface ProfileStatItem {
  label: string;
  value: string;
  description?: string;
}

interface ProfileStatsProps {
  stats: ProfileStatItem[];
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-2xl border border-white/70 bg-white/85 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <p className="text-sm font-medium text-slate-500">{stat.label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{stat.value}</p>
          {stat.description && <p className="mt-2 text-sm text-slate-500">{stat.description}</p>}
        </article>
      ))}
    </div>
  );
};

export default ProfileStats;
