'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import css from './NoteDetails.module.css';

interface NoteDetailsClientProps {
  noteId: string; // Změněno z number na string
}

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  const { id } = useParams();
  
  // ID z params je již string, není třeba převádět na number
  const actualNoteId = (id as string) || noteId;

  // Pokud ID není platné, zobraz chybu
  if (!actualNoteId) {
    return <p>Invalid note ID</p>;
  }

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', actualNoteId],
    queryFn: () => fetchNoteById(actualNoteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}