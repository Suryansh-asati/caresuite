import { z } from 'zod';

export const listYogaSchema = z.object({
  query: z.object({
    category: z.string().optional(),
    level: z.string().optional(),
    intensity: z.string().optional(),
  }),
});

export const yogaIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Yoga session ID is required'),
  }),
});

export type ListYogaQuery = z.infer<typeof listYogaSchema>['query'];
export type YogaIdParams = z.infer<typeof yogaIdSchema>['params'];
