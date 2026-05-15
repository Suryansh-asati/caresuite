import React from 'react';

interface PreferenceCardProps {
  title: string;
  description: string;
  value: string;
  tone?: 'default' | 'muted' | 'accent';
}

const toneClasses = {
  default: 'bg-slate-100 text-slate-700',
  muted: 'bg-slate-50 text-slate-600',
  accent: 'bg-emerald-50 text-emerald-900',
};

export const PreferenceCard: React.FC<PreferenceCardProps> = ({
  title,
  description,
  value,
  tone = 'default',
}) => {
  return (
    <article className="rounded-2xl border border-slate-200/70 bg-white p-4 transition hover:border-emerald-200 hover:shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-base font-semibold text-slate-900">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      <span
        className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-medium ${toneClasses[tone]}`}
      >
        Placeholder
      </span>
    </article>
  );
};

export default PreferenceCard;
