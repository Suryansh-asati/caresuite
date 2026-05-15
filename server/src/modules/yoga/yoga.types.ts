export interface YogaSessionFilters {
  category?: string;
  level?: string;
  intensity?: string;
}

export interface YogaSessionDto {
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
  createdAt: Date;
  updatedAt: Date;
}

export interface YogaCategory {
  name: string;
}

export interface YogaLevel {
  name: string;
}
