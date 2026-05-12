import React from 'react';

interface SectionHeroProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  eyebrow?: string;
  titleAs?: 'h1' | 'h2' | 'h3';
  className?: string;
}

export const SectionHero: React.FC<SectionHeroProps> = ({
  title,
  subtitle,
  actions,
  eyebrow,
  titleAs = 'h2',
  className = '',
}) => {
  const TitleTag = titleAs;

  return (
    <section
      className={`rounded-3xl border border-emerald-100/70 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6 sm:p-8 ${className}`.trim()}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-700/80">{eyebrow}</p>
          )}
          <TitleTag className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
            {title}
          </TitleTag>
          {subtitle && <p className="mt-3 text-base text-slate-600 sm:text-lg">{subtitle}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  );
};
