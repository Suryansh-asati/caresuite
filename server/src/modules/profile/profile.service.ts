import bcrypt from 'bcrypt';
import type { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import type { ProfileRecord, UpdatePasswordInput, UpdateProfileInput } from './profile.types';

const createHttpError = (statusCode: number, message: string) => {
  const error = new Error(message) as Error & { statusCode: number };
  error.statusCode = statusCode;
  return error;
};

const profileSelect = {
  id: true,
  name: true,
  email: true,
  avatarUrl: true,
  bio: true,
  preferredTheme: true,
  createdAt: true,
  updatedAt: true,
} as const;

export class ProfileService {
  async getProfile(userId: string): Promise<ProfileRecord> {
    const profile = await prisma.user.findUnique({
      where: { id: userId },
      select: profileSelect,
    });

    if (!profile) {
      throw createHttpError(404, 'Profile not found');
    }

    return profile;
  }

  async updateProfile(userId: string, input: UpdateProfileInput): Promise<ProfileRecord> {
    const existingProfile = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!existingProfile) {
      throw createHttpError(404, 'Profile not found');
    }

    const updateData: Prisma.UserUpdateInput = {
      name: input.name.trim(),
    };

    if (input.avatarUrl !== undefined) {
      updateData.avatarUrl = input.avatarUrl;
    }

    if (input.bio !== undefined) {
      updateData.bio = input.bio;
    }

    if (input.preferredTheme !== undefined) {
      updateData.preferredTheme = input.preferredTheme;
    }

    const profile = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: profileSelect,
    });

    return profile;
  }

  async updatePassword(userId: string, input: UpdatePasswordInput): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, passwordHash: true },
    });

    if (!user) {
      throw createHttpError(404, 'Profile not found');
    }

    const isCurrentPasswordValid = await bcrypt.compare(input.currentPassword, user.passwordHash);

    if (!isCurrentPasswordValid) {
      throw createHttpError(401, 'Current password is incorrect');
    }

    const passwordHash = await bcrypt.hash(input.newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });
  }
}

export const profileService = new ProfileService();
