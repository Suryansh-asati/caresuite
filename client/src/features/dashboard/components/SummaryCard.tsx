import React from 'react';

interface SummaryCardProps {
  icon: string;
  label: string;
  value: string | number;
  subtitle?: string;
  className?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  icon,
  label,
  value,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 border border-gray-100 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
        </div>
        <div className="text-3xl ml-2">{icon}</div>
      </div>
    </div>
  );
};
