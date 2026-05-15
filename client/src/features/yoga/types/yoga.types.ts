export interface YogaSession {
  id: string;
  title: string;
  description: string | null;
  category: string;
  level: string;
  duration: number;
  thumbnail: string | null;
  videoUrl: string;
  poseCount: number | null;
  intensity: string | null;
  benefits: string | null;
  createdAt: string;
  updatedAt: string;
}

export type YogaCategory = string;
export type YogaLevel = string;
