import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { queryClient } from '../../../lib/queryClient';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;
  // ID je již string, není třeba převádět na number
  const noteId = id;

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={noteId} />
    </HydrationBoundary>
  );
}