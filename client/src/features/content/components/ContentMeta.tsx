import React from 'react';

interface ContentMetaProps {
  duration?: number;
  category?: string;
  difficulty?: string;
  createdAt?: string | Date;
  className?: string;
}

const formatDate = (value: string | Date) => {
  let date: Date;

  if (value instanceof Date) {
    date = value;
  } else if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    // Date-only string: append UTC time to avoid timezone shifts
    date = new Date(value + 'T00:00:00Z');
  } else {
    date = new Date(value);
  }

  if (Number.isNaN(date.valueOf())) {
    return null;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  });
};

export const ContentMeta: React.FC<ContentMetaProps> = ({
  duration,
  category,
  difficulty,
  createdAt,
  className = '',
}) => {
  const items: string[] = [];

  if (duration != null) {
    items.push(`${duration} min`);
  }

  if (difficulty) {
    items.push(difficulty);
  }

  if (category) {
    items.push(category);
  }

  if (createdAt) {
    const formattedDate = formatDate(createdAt);
    if (formattedDate) {
      items.push(formattedDate);
    }
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 text-xs text-slate-500 ${className}`.trim()}>
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="rounded-full bg-slate-100/70 px-2 py-1">
          {item}
        </span>
      ))}
    </div>
  );
};
