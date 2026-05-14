export interface TherapySessionFilters {
  category?: string;
}

export interface TherapySessionDto {
  id: string;
  title: string;
  description: string | null;
  category: string;
  duration: number;
  thumbnail: string | null;
  audioUrl: string;
  createdAt: Date;
}
