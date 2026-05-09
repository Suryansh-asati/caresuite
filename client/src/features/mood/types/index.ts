export interface MoodEntry {
  id: string;
  mood: string;
  note?: string;
  createdAt: string;
  userId: string;
}

export interface CreateMoodDto {
  mood: string;
  note?: string;
}
