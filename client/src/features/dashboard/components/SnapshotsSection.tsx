import React from 'react';
import { SectionCard } from './SectionCard';
import { EmptyState } from './EmptyState';
import type { LatestMood, LatestJournal, LatestWorkout } from '../types/dashboard.types';

interface SnapshotsSectionProps {
  latestMood?: LatestMood | null;
  latestJournal?: LatestJournal | null;
  latestWorkout?: LatestWorkout | null;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

const getMoodEmoji = (moodScore: number) => {
  const moodMap: Record<number, string> = {
    1: '😞',
    2: '😕',
    3: '😐',
    4: '🙂',
    5: '😄',
  };
  return moodMap[moodScore] || '😐';
};

export const SnapshotsSection: React.FC<SnapshotsSectionProps> = ({
  latestMood,
  latestJournal,
  latestWorkout,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Mood Snapshot */}
      <SectionCard title="Latest Mood" className="lg:col-span-1">
        {latestMood ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{getMoodEmoji(latestMood.mood)}</div>
              <div>
                <p className="text-sm text-gray-600">Feeling</p>
                <p className="text-lg font-semibold text-gray-900">
                  {['Terrible', 'Bad', 'Okay', 'Good', 'Great'][latestMood.mood - 1]}
                </p>
              </div>
            </div>
            {latestMood.note && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700 italic">{`"${latestMood.note}"`}</p>
              </div>
            )}
            <p className="text-xs text-gray-500">{formatDate(latestMood.createdAt)}</p>
          </div>
        ) : (
          <EmptyState icon="🤔" title="No moods yet" message="Start by logging your first mood" />
        )}
      </SectionCard>

      {/* Journal Snapshot */}
      <SectionCard title="Latest Journal" className="lg:col-span-1">
        {latestJournal ? (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 line-clamp-2">{latestJournal.title}</h4>
            <p className="text-xs text-gray-500">{formatDate(latestJournal.createdAt)}</p>
          </div>
        ) : (
          <EmptyState
            icon="📝"
            title="No journals yet"
            message="Start journaling to reflect on your thoughts"
          />
        )}
      </SectionCard>

      {/* Workout Snapshot */}
      <SectionCard title="Latest Workout" className="lg:col-span-1">
        {latestWorkout ? (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 line-clamp-2">{latestWorkout.title}</h4>
            <div className="flex flex-wrap gap-3">
              <div className="text-sm">
                <p className="text-gray-600">Type</p>
                <p className="font-medium text-gray-900 capitalize">{latestWorkout.workoutType}</p>
              </div>
              {latestWorkout.duration && (
                <div className="text-sm">
                  <p className="text-gray-600">Duration</p>
                  <p className="font-medium text-gray-900">{latestWorkout.duration} min</p>
                </div>
              )}
              <div className="text-sm">
                <p className="text-gray-600">Exercises</p>
                <p className="font-medium text-gray-900">{latestWorkout.exerciseCount}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">{formatDate(latestWorkout.createdAt)}</p>
          </div>
        ) : (
          <EmptyState icon="🏃" title="No workouts yet" message="Log your first workout session" />
        )}
      </SectionCard>
    </div>
  );
};
