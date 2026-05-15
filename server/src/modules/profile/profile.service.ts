import bcrypt from 'bcrypt';
import type { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import type { ProfileRecord, UpdatePasswordInput, UpdateProfileInput } from './profile.types';

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
      throw { statusCode: 404, message: 'Profile not found' };
    }

    return profile;
  }

  async updateProfile(userId: string, input: UpdateProfileInput): Promise<ProfileRecord> {
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
      throw { statusCode: 404, message: 'Profile not found' };
    }

    const isCurrentPasswordValid = await bcrypt.compare(input.currentPassword, user.passwordHash);

    if (!isCurrentPasswordValid) {
      throw { statusCode: 401, message: 'Current password is incorrect' };
    }

    const passwordHash = await bcrypt.hash(input.newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });
  }
}

export const profileService = new ProfileService();
