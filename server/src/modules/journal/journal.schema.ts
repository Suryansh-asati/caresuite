import { z } from 'zod';

const journalTitleSchema = z
  .string()
  .trim()
  .min(1, 'Title is required')
  .max(120, 'Title must be 120 characters or fewer');

const journalContentSchema = z
  .string()
  .trim()
  .min(1, 'Content is required')
  .max(5000, 'Content must be 5000 characters or fewer');

export const createJournalSchema = z.object({
  body: z.object({
    title: journalTitleSchema,
    content: journalContentSchema,
  }),
});

export const updateJournalSchema = z.object({
  body: z.object({
    title: journalTitleSchema,
    content: journalContentSchema,
  }),
});

export const journalIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Journal entry id is required'),
  }),
});

export type CreateJournalInput = z.infer<typeof createJournalSchema>['body'];
export type UpdateJournalInput = z.infer<typeof updateJournalSchema>['body'];
