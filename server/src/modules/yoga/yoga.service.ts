import { prisma } from '../../lib/prisma';
import type { YogaSessionDto, YogaSessionFilters } from './yoga.types';

type YogaSessionDelegate = {
  findMany: (args?: unknown) => Promise<unknown[]>;
  findUnique: (args: unknown) => Promise<unknown | null>;
};

const yogaSessionClient = (prisma as unknown as { yogaSession: YogaSessionDelegate }).yogaSession;

export class YogaService {
  async getYogaSessions(filters: YogaSessionFilters = {}): Promise<YogaSessionDto[]> {
    const where = this.buildWhere(filters);
    const sessions = await yogaSessionClient.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return sessions as YogaSessionDto[];
  }

  async getYogaSessionById(id: string): Promise<YogaSessionDto> {
    const yogaSession = (await yogaSessionClient.findUnique({
      where: { id },
    })) as YogaSessionDto | null;

    if (!yogaSession) {
      throw { statusCode: 404, message: 'Yoga session not found' };
    }

    return yogaSession;
  }

  async getYogaCategories(): Promise<string[]> {
    const categories = (await yogaSessionClient.findMany({
      distinct: ['category'],
      select: { category: true },
      orderBy: { category: 'asc' },
    })) as Array<{ category: string }>;

    return categories.map((item) => item.category);
  }

  async getYogaLevels(): Promise<string[]> {
    const levels = (await yogaSessionClient.findMany({
      distinct: ['level'],
      select: { level: true },
      orderBy: { level: 'asc' },
    })) as Array<{ level: string }>;

    return levels.map((item) => item.level);
  }

  private buildWhere(filters: YogaSessionFilters) {
    const where: Record<string, unknown> = {};

    if (filters.category) {
      where.category = {
        equals: filters.category,
        mode: 'insensitive',
      };
    }

    if (filters.level) {
      where.level = {
        equals: filters.level,
        mode: 'insensitive',
      };
    }

    if (filters.intensity) {
      where.intensity = {
        equals: filters.intensity,
        mode: 'insensitive',
      };
    }

    return Object.keys(where).length > 0 ? where : {};
  }
}

export const yogaService = new YogaService();
