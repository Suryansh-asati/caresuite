import React from 'react';
import { SectionCard } from './SectionCard';
import { EmptyState } from './EmptyState';
import type { RecentActivity } from '../types/dashboard.types';

interface RecentActivityFeedProps {
  activities: RecentActivity[];
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const getActivityIcon = (type: RecentActivity['type']) => {
  const iconMap: Record<RecentActivity['type'], string> = {
    mood: '😊',
    journal: '📝',
    workout: '🏃',
  };
  return iconMap[type];
};

export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ activities }) => {
  return (
    <SectionCard title="Recent Activity" className="mb-8">
      {activities.length > 0 ? (
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="text-xl mt-0.5">{getActivityIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                <p className="text-xs text-gray-500 mt-1">{formatDate(activity.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="🌟"
          title="No activities yet"
          message="Your recent activities will appear here as you use CareSuite"
        />
      )}
    </SectionCard>
  );
};
