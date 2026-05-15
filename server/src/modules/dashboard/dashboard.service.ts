import { prisma } from '../../lib/prisma';
import type {
  DashboardOverviewResponse,
  DashboardSummaryCards,
  LatestMood,
  LatestJournal,
  LatestWorkout,
  RecentActivity,
} from './dashboard.types';

export class DashboardService {
  async getDashboardOverview(userId: string): Promise<DashboardOverviewResponse> {
    // Fetch all data in parallel for efficiency
    const [moodCount, journalCount, workoutData, latestMood, latestJournal, latestWorkout] =
      await Promise.all([
        prisma.moodEntry.count({
          where: { userId },
        }),
        prisma.journalEntry.count({
          where: { userId },
        }),
        prisma.workoutSession.aggregate({
          where: { userId },
          _count: {
            _all: true,
          },
          _sum: {
            duration: true,
          },
        }),
        prisma.moodEntry.findFirst({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            moodScore: true,
            note: true,
            createdAt: true,
          },
        }),
        prisma.journalEntry.findFirst({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            createdAt: true,
          },
        }),
        prisma.workoutSession.findFirst({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            workoutType: true,
            duration: true,
            createdAt: true,
            _count: {
              select: {
                exercises: true,
              },
            },
          },
        }),
      ]);

    // Build summary cards
    const summaryCards: DashboardSummaryCards = {
      moodEntries: moodCount,
      journalEntries: journalCount,
      workoutSessions: workoutData._count._all,
      workoutMinutes: workoutData._sum.duration ?? 0,
    };

    // Build latest entries
    const latest: {
      mood?: LatestMood | null;
      journal?: LatestJournal | null;
      workout?: LatestWorkout | null;
    } = {};

    if (latestMood) {
      latest.mood = {
        id: latestMood.id,
        mood: latestMood.moodScore,
        note: latestMood.note,
        createdAt: latestMood.createdAt.toISOString(),
      };
    }

    if (latestJournal) {
      latest.journal = {
        id: latestJournal.id,
        title: latestJournal.title,
        createdAt: latestJournal.createdAt.toISOString(),
      };
    }

    if (latestWorkout) {
      latest.workout = {
        id: latestWorkout.id,
        title: latestWorkout.title,
        workoutType: latestWorkout.workoutType,
        duration: latestWorkout.duration,
        exerciseCount: latestWorkout._count.exercises,
        createdAt: latestWorkout.createdAt.toISOString(),
      };
    }

    // Fetch recent activities from all sources (limit to 15 total)
    const [moods, journals, workouts] = await Promise.all([
      prisma.moodEntry.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          moodScore: true,
          createdAt: true,
        },
      }),
      prisma.journalEntry.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          title: true,
          createdAt: true,
        },
      }),
      prisma.workoutSession.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          title: true,
          createdAt: true,
        },
      }),
    ]);

    // Combine and sort by creation date
    const recentActivities: RecentActivity[] = [
      ...moods.map((m) => ({
        id: m.id,
        type: 'mood' as const,
        title: `Mood: ${this.getMoodLabel(m.moodScore)}`,
        createdAt: m.createdAt.toISOString(),
      })),
      ...journals.map((j) => ({
        id: j.id,
        type: 'journal' as const,
        title: j.title,
        createdAt: j.createdAt.toISOString(),
      })),
      ...workouts.map((w) => ({
        id: w.id,
        type: 'workout' as const,
        title: w.title,
        createdAt: w.createdAt.toISOString(),
      })),
    ]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 15);

    return {
      summaryCards,
      latestMood: latest.mood ?? null,
      latestJournal: latest.journal ?? null,
      latestWorkout: latest.workout ?? null,
      recentActivities,
    };
  }

  private getMoodLabel(moodScore: number): string {
    const moodMap: Record<number, string> = {
      1: 'Terrible',
      2: 'Bad',
      3: 'Okay',
      4: 'Good',
      5: 'Great',
    };
    return moodMap[moodScore] || 'Unknown';
  }
}

export const dashboardService = new DashboardService();
