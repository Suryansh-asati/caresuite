export interface TherapySessionData {
  id: string;
  title: string;
  description?: string;
  category: string;
  duration: number;
  thumbnail?: string;
  audioUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TherapyFilters {
  category?: string;
  limit?: number;
  offset?: number;
}

export interface TherapyCategory {
  name: string;
  count: number;
}
