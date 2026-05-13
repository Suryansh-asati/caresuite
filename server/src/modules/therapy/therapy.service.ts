import { PrismaClient, Prisma } from '@prisma/client';
import type { TherapySessionData, TherapyFilters, TherapyCategory } from './therapy.types';

const prisma = new PrismaClient();

export class TherapyService {
  /**
   * Get all therapy sessions with optional filtering
   */
  async getTherapySessions(filters?: TherapyFilters): Promise<TherapySessionData[]> {
    const { category, limit = 50, offset = 0 } = filters || {};

    const where: Prisma.TherapySessionWhereInput = category
      ? {
          category: {
            equals: category,
            mode: 'insensitive',
          },
        }
      : {};

    const sessions = await prisma.therapySession.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return sessions as TherapySessionData[];
  }

  /**
   * Get a specific therapy session by ID
   */
  async getTherapySessionById(id: string): Promise<TherapySessionData | null> {
    const session = await prisma.therapySession.findUnique({
      where: { id },
    });

    return session as TherapySessionData | null;
  }

  /**
   * Get all available therapy categories with counts
   */
  async getTherapyCategories(): Promise<TherapyCategory[]> {
    const categories = await prisma.therapySession.groupBy({
      by: ['category'],
      _count: {
        id: true,
      },
    });

    return categories
      .map((cat) => ({
        name: cat.category,
        count: cat._count.id,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Get session count (useful for pagination)
   */
  async getTherapySessionCount(category?: string): Promise<number> {
    const where: Prisma.TherapySessionWhereInput = category
      ? {
          category: {
            equals: category,
            mode: 'insensitive',
          },
        }
      : {};

    return prisma.therapySession.count({ where });
  }
}

export const therapyService = new TherapyService();
