import axios from 'axios';
import { Note, CreateNoteData, FetchNotesResponse } from '../../types/note';

const API_BASE_URL = 'https://notehub-public.goit.study/api';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchNotes = async (page: number = 1, search: string = ''): Promise<FetchNotesResponse> => {
  const params: any = { page, perPage: 12 };
  if (search) params.search = search;
  
  const response = await api.get('/notes', { params });
  return response.data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const response = await api.post('/notes', noteData);
  return response.data;
};

export const deleteNote = async (id: number): Promise<void> => {
  await api.delete(`/notes/${id}`);
};