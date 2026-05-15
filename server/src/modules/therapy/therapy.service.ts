import { prisma } from '../../lib/prisma';
import type { TherapySessionDto, TherapySessionFilters } from './therapy.types';

type TherapySessionDelegate = {
  findMany: (args?: unknown) => Promise<unknown[]>;
  findUnique: (args: unknown) => Promise<unknown | null>;
};

const therapySessionClient = (prisma as unknown as { therapySession: TherapySessionDelegate })
  .therapySession;

export class TherapyService {
  async getTherapySessions(filters: TherapySessionFilters = {}): Promise<TherapySessionDto[]> {
    const sessions = await therapySessionClient.findMany({
      where: this.buildWhere(filters),
      orderBy: { createdAt: 'desc' },
    });

    return sessions as TherapySessionDto[];
  }

  async getTherapySessionById(id: string): Promise<TherapySessionDto> {
    const therapySession = (await therapySessionClient.findUnique({
      where: { id },
    })) as TherapySessionDto | null;

    if (!therapySession) {
      throw { statusCode: 404, message: 'Therapy session not found' };
    }

    return therapySession;
  }

  async getTherapyCategories(): Promise<string[]> {
    const categories = (await therapySessionClient.findMany({
      distinct: ['category'],
      select: { category: true },
      orderBy: { category: 'asc' },
    })) as Array<{ category: string }>;

    return categories.map((item) => item.category);
  }

  private buildWhere(filters: TherapySessionFilters): Record<string, unknown> {
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
