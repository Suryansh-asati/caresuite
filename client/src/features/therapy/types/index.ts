export interface TherapySession {
  id: string;
  title: string;
  description?: string;
  category: string;
  duration: number;
  thumbnail?: string;
  audioUrl: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface TherapyCategory {
  name: string;
  count: number;
}

export interface TherapyPaginationMeta {
  total: number;
  limit: number;
  offset: number;
}

export interface TherapyResponse<T> {
  success: boolean;
  data: T;
  pagination?: TherapyPaginationMeta;
}
