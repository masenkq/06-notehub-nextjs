import axios from 'axios';
import { Note, CreateNoteData } from '../types/note'; // Odstraněn FetchNotesResponse

const API_BASE_URL = 'https://notehub-public.goit.study/api';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Interface pro params
interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

// FetchNotesResponse definován přímo zde
export interface FetchNotesResponse {
  data: Note[];
  total: number;
  page: number;
  perPage: number;
}

export const fetchNotes = async (page: number = 1, search: string = ''): Promise<FetchNotesResponse> => {
  const params: FetchNotesParams = { page, perPage: 12 };
  if (search) params.search = search;
  
  const response = await api.get<FetchNotesResponse>('/notes', { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const response = await api.post<Note>('/notes', noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};