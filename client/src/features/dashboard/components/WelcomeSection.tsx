import React from 'react';
import { useAuth } from '../../../context/AuthContext';

export const WelcomeSection: React.FC = () => {
  const auth = useAuth() as {
    user?: { name?: string } | null;
    currentUser?: { name?: string } | null;
  };
  const user = auth.user ?? auth.currentUser ?? null;

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
        {getTimeGreeting()}, {user?.name?.split(' ')[0] || 'Friend'} 👋
      </h1>
      <p className="mt-2 text-lg text-gray-600">Here&apos;s your wellness snapshot for today</p>
    </div>
  );
};
