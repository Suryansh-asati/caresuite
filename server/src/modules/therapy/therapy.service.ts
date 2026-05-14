import { Prisma, PrismaClient } from '@prisma/client';
import type { TherapySessionDto, TherapySessionFilters } from './therapy.types';

const prisma = new PrismaClient();

export class TherapyService {
  async getTherapySessions(filters: TherapySessionFilters = {}): Promise<TherapySessionDto[]> {
    return prisma.therapySession.findMany({
      where: this.buildWhere(filters),
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTherapySessionById(id: string): Promise<TherapySessionDto> {
    const therapySession = await prisma.therapySession.findUnique({
      where: { id },
    });

    if (!therapySession) {
      throw { statusCode: 404, message: 'Therapy session not found' };
    }

    return therapySession;
  }

  async getTherapyCategories(): Promise<string[]> {
    const categories = await prisma.therapySession.findMany({
      distinct: ['category'],
      select: { category: true },
      orderBy: { category: 'asc' },
    });

    return categories.map((item) => item.category);
  }

  private buildWhere(filters: TherapySessionFilters): Prisma.TherapySessionWhereInput {
    if (!filters.category) {
      return {};
    }

    return {
      category: {
        equals: filters.category,
        mode: 'insensitive',
      },
    };
  }
}

export const therapyService = new TherapyService();
