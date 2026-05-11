import React from 'react';
import { SummaryCard } from './SummaryCard';
import type { DashboardSummaryCards } from '../types/dashboard.types';

interface SummaryCardsGridProps {
  data: DashboardSummaryCards;
}

export const SummaryCardsGrid: React.FC<SummaryCardsGridProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <SummaryCard icon="😊" label="Mood Entries" value={data.moodEntries} />
      <SummaryCard icon="📝" label="Journal Entries" value={data.journalEntries} />
      <SummaryCard icon="🏃" label="Workouts" value={data.workoutSessions} />
      <SummaryCard icon="⏱️" label="Total Minutes" value={data.workoutMinutes} />
    </div>
  );
};
