export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface Note {
  id: string; // Změněno z number na string
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string; // Přejmenováno z created_at na createdAt
  updatedAt: string; // Přidáno nové pole
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}