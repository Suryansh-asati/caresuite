import { PrismaClient } from '@prisma/client';
import { CreateMoodInput } from './moods.schema';

const prisma = new PrismaClient();

export class MoodsService {
  async createMood(userId: string, data: CreateMoodInput) {
    return prisma.moodEntry.create({
      data: {
        moodScore: parseInt(data.mood as any, 10) || 3, // fallback to 3
        note: data.note,
        userId,
      },
    });
  }

  async getMoodsByUserId(userId: string) {
    return prisma.moodEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteMood(userId: string, moodId: string) {
    const mood = await prisma.moodEntry.findUnique({
      where: { id: moodId },
    });

    if (!mood) {
      throw { statusCode: 404, message: 'Mood entry not found' };
    }

    if (mood.userId !== userId) {
      throw { statusCode: 403, message: 'Forbidden to delete this entry' };
    }

    return prisma.moodEntry.delete({
      where: { id: moodId },
    });
  }
}

export const moodsService = new MoodsService();
