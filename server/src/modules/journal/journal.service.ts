import { PrismaClient } from '@prisma/client';
import type { CreateJournalInput, UpdateJournalInput } from './journal.schema';

const prisma = new PrismaClient();

const createHttpError = (statusCode: number, message: string) => {
  const error = new Error(message) as Error & { statusCode: number };
  error.statusCode = statusCode;
  return error;
};

export class JournalService {
  async createEntry(userId: string, data: CreateJournalInput) {
    return prisma.journalEntry.create({
      data: {
        title: data.title.trim(),
        content: data.content.trim(),
        userId,
      },
    });
  }

  async getUserEntries(userId: string) {
    return prisma.journalEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateEntry(entryId: string, userId: string, data: UpdateJournalInput) {
    const existingEntry = await prisma.journalEntry.findUnique({
      where: { id: entryId },
    });

    if (!existingEntry) {
      throw createHttpError(404, 'Journal entry not found');
    }

    if (existingEntry.userId !== userId) {
      throw createHttpError(403, 'Forbidden to update this entry');
    }

    return prisma.journalEntry.update({
      where: { id: entryId },
      data: {
        title: data.title.trim(),
        content: data.content.trim(),
      },
    });
  }

  async deleteEntry(entryId: string, userId: string) {
    const existingEntry = await prisma.journalEntry.findUnique({
      where: { id: entryId },
    });

    if (!existingEntry) {
      throw createHttpError(404, 'Journal entry not found');
    }

    if (existingEntry.userId !== userId) {
      throw createHttpError(403, 'Forbidden to delete this entry');
    }

    return prisma.journalEntry.delete({
      where: { id: entryId },
    });
  }
}

export const journalService = new JournalService();
