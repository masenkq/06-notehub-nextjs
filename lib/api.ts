import axios from 'axios';
import type { Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN; // Změněno z import.meta.env

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (searchText: string, page: number): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: {
      ...(searchText !== '' && { search: searchText }),
      page,
      perPage: 12,
    },
  });
  return response.data;
};

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (noteData: CreateNoteParams): Promise<Note> => {
  const response = await api.post<Note>('/notes', noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

// DOPLŇ CHYBĚJÍCÍ FUNKCI:
export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};