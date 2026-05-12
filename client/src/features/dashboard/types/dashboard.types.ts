export interface DashboardSummaryCards {
  moodEntries: number;
  journalEntries: number;
  workoutSessions: number;
  workoutMinutes: number;
}

export interface LatestMood {
  id: string;
  mood: number;
  note?: string | null;
  createdAt: string;
}

export interface LatestJournal {
  id: string;
  title: string;
  createdAt: string;
}

export interface LatestWorkout {
  id: string;
  title: string;
  workoutType: string;
  duration?: number | null;
  exerciseCount: number;
  createdAt: string;
}

export interface RecentActivity {
  id: string;
  type: 'mood' | 'journal' | 'workout';
  title: string;
  createdAt: string;
}

export interface DashboardOverview {
  summaryCards: DashboardSummaryCards;
  latestMood?: LatestMood | null;
  latestJournal?: LatestJournal | null;
  latestWorkout?: LatestWorkout | null;
  recentActivities: RecentActivity[];
}
