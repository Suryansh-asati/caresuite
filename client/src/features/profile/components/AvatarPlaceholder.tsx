import React from 'react';

interface AvatarPlaceholderProps {
  name: string;
  avatarUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-12 w-12 text-sm',
  md: 'h-20 w-20 text-xl',
  lg: 'h-28 w-28 text-3xl',
};

export const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({
  name,
  avatarUrl,
  size = 'md',
  className = '',
}) => {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 text-emerald-900 ring-4 ring-white ${sizeClasses[size]} ${className}`.trim()}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt={`${name} avatar`} className="h-full w-full object-cover" />
      ) : (
        <span className="font-semibold">{initials || 'CS'}</span>
      )}
    </div>
  );
};

export default AvatarPlaceholder;
