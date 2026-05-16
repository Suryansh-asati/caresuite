import { z } from 'zod';

export const profileUpdateSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters').max(80),
    avatarUrl: z.string().trim().url('Avatar URL must be a valid URL').nullable().optional(),
    bio: z.string().trim().max(240, 'Bio must be 240 characters or fewer').nullable().optional(),
    preferredTheme: z.string().trim().max(40, 'Theme value is too long').nullable().optional(),
  }),
});

export const profilePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(6, 'Current password must be at least 6 characters'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters').max(72),
  }),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>['body'];
export type ProfilePasswordInput = z.infer<typeof profilePasswordSchema>['body'];
