import type { ContentItem } from '../../content';

export interface TherapySession extends ContentItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  duration: number;
  thumbnail?: string;
  audioUrl: string;
  createdAt: string;
}

export type TherapyCategory = string;
