import { z } from 'zod';

export const therapyIdSchema = z.object({
  params: z.object({
    id: z.string().trim().min(1, 'Therapy session id is required'),
  }),
});

export const listTherapySchema = z.object({
  query: z.object({
    category: z
      .string()
      .trim()
      .min(1, 'Category cannot be empty')
      .max(80, 'Category is too long')
      .optional(),
  }),
});

export type ListTherapyInput = z.infer<typeof listTherapySchema>['query'];
