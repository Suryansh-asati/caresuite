import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RegisterInput, LoginInput } from './auth.schema';
import { UserPayload } from './auth.types';

const prisma = new PrismaClient();

export class AuthService {
  private generateToken(payload: UserPayload): string {
    return jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret', {
      expiresIn: '7d',
    });
  }

  async register(data: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('Email is already registered');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
      },
    });

    const userPayload: UserPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      user: userPayload,
      token: this.generateToken(userPayload),
    };
  }

  async login(data: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !user.passwordHash) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const userPayload: UserPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      user: userPayload,
      token: this.generateToken(userPayload),
    };
  }

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true }, // Filter sensitive data
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}

export const authService = new AuthService();
