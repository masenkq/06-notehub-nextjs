'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../lib/api/notes';
import css from './NoteDetail.module.css';

export default function NoteDetail() {
  const { id } = useParams();
  const noteId = parseInt(id as string); // Převede string na number

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId), // noteId je teď number
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
        <p className={css.tag}>Tag: {note.tag}</p>
        <p className={css.date}>Created: {new Date(note.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}