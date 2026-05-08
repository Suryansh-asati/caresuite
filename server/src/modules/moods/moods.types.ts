export interface MoodEntry {
  id: string;
  mood: string;
  note?: string | null;
  createdAt: Date;
  userId: string;
}

export interface MoodResponse {
  success: boolean;
  data: MoodEntry | MoodEntry[];
}
