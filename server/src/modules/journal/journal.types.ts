export interface CreateJournalInput {
  title: string;
  content: string;
}

export interface UpdateJournalInput {
  title: string;
  content: string;
}

export interface JournalEntryResponse {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
