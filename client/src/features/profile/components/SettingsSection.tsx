import React from 'react';

interface SettingsSectionProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  description,
  action,
  children,
}) => {
  return (
    <section className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-[0_18px_40px_-26px_rgba(15,23,42,0.2)] sm:p-7">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h3>
          {description && <p className="mt-1 max-w-2xl text-sm text-slate-500">{description}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </section>
  );
};

export default SettingsSection;
