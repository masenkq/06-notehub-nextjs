'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api/notes';
import css from './NoteDetails.module.css';

interface Props {
  noteId: number;
}

export default function NoteDetailsClient({ noteId }: Props) {
  const { id } = useParams();
  const actualNoteId = noteId || parseInt(id as string);

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', actualNoteId],
    queryFn: () => fetchNoteById(actualNoteId),
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
        <p className={css.date}>{new Date(note.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}