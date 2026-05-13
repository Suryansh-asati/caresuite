import { z } from 'zod';

export const therapyIdSchema = z.object({
  params: z.object({
    id: z.string().cuid('Invalid therapy session ID'),
  }),
});

export const therapyFiltersSchema = z.object({
  query: z.object({
    category: z.string().optional(),
    limit: z.string().transform(Number).pipe(z.number().int().positive()).optional(),
    offset: z.string().transform(Number).pipe(z.number().int().nonnegative()).optional(),
  }),
});

export type TherapyIdSchema = z.infer<typeof therapyIdSchema>;
export type TherapyFiltersSchema = z.infer<typeof therapyFiltersSchema>;
