import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { WelcomeSection } from '../components/WelcomeSection';
import { SummaryCardsGrid } from '../components/SummaryCardsGrid';
import { SnapshotsSection } from '../components/SnapshotsSection';
import { RecentActivityFeed } from '../components/RecentActivityFeed';
import { useDashboard } from '../hooks/useDashboard';

export const DashboardPage: React.FC = () => {
  const { data, loading, error } = useDashboard();

  if (loading) {
    return (
      <PageContainer>
        <LoadingSpinner />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800">Failed to load your wellness dashboard</p>
          <p className="text-red-600 text-sm mt-2">{error}</p>
        </div>
      </PageContainer>
    );
  }

  if (!data) {
    return (
      <PageContainer>
        <LoadingSpinner />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <WelcomeSection />
      <SummaryCardsGrid data={data.summaryCards} />
      <SnapshotsSection
        latestMood={data.latestMood}
        latestJournal={data.latestJournal}
        latestWorkout={data.latestWorkout}
      />
      <RecentActivityFeed activities={data.recentActivities} />
    </PageContainer>
  );
};

export default DashboardPage;
