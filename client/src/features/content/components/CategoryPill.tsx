import React from 'react';

interface CategoryPillProps {
  label: string;
  value?: string;
  active?: boolean;
  onClick?: (value: string) => void;
  className?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({
  label,
  value,
  active = false,
  onClick,
  className = '',
  size = 'md',
  disabled = false,
}) => {
  const classes = [
    'inline-flex items-center rounded-full border transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2',
    size === 'sm' ? 'text-xs px-3 py-1' : 'text-sm px-4 py-1.5',
    active
      ? 'bg-emerald-100/70 text-emerald-900 border-emerald-200'
      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50',
    disabled ? 'opacity-50 cursor-not-allowed hover:bg-white' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const displayValue = value ?? label;

  if (!onClick) {
    return <span className={classes}>{label}</span>;
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={() => onClick(displayValue)}
      aria-pressed={active}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
