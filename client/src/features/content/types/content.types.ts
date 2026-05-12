export type ContentCategory = string;

export type ContentType = 'therapy' | 'yoga' | 'education' | 'session' | 'article' | 'resource';

export type ContentDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'all-levels';

export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  category?: ContentCategory;
  thumbnail?: string;
  duration?: number;
  difficulty?: ContentDifficulty | string;
  type?: ContentType;
  createdAt?: string | Date;
}
