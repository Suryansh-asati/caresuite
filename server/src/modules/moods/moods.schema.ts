import { z } from 'zod';

export const createMoodSchema = z.object({
  body: z.object({
    mood: z.string().min(1, 'Mood is required'),
    note: z.string().optional(),
  }),
});

export const moodIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export type CreateMoodInput = z.infer<typeof createMoodSchema>['body'];
