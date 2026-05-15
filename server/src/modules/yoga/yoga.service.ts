import { Prisma, PrismaClient } from '@prisma/client';
import type { YogaSessionDto, YogaSessionFilters } from './yoga.types';

const prisma = new PrismaClient();

export class YogaService {
  async getYogaSessions(filters: YogaSessionFilters = {}): Promise<YogaSessionDto[]> {
    return prisma.yogaSession.findMany({
      where: this.buildWhere(filters),
      orderBy: { createdAt: 'desc' },
    });
  }

  async getYogaSessionById(id: string): Promise<YogaSessionDto> {
    const yogaSession = await prisma.yogaSession.findUnique({
      where: { id },
    });

    if (!yogaSession) {
      throw { statusCode: 404, message: 'Yoga session not found' };
    }

    return yogaSession;
  }

  async getYogaCategories(): Promise<string[]> {
    const categories = await prisma.yogaSession.findMany({
      distinct: ['category'],
      select: { category: true },
      orderBy: { category: 'asc' },
    });

    return categories.map((item) => item.category);
  }

  async getYogaLevels(): Promise<string[]> {
    const levels = await prisma.yogaSession.findMany({
      distinct: ['level'],
      select: { level: true },
      orderBy: { level: 'asc' },
    });

    return levels.map((item) => item.level);
  }

  private buildWhere(filters: YogaSessionFilters): Prisma.YogaSessionWhereInput {
    const where: Prisma.YogaSessionWhereInput = {};

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
