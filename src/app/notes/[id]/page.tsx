import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { queryClient } from '../../../lib/queryClient';
import { fetchNoteById } from '../../../lib/api/notes';
import NoteDetailsClient from './NoteDetails.client';

interface Props {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: Props) {
  const noteId = parseInt(params.id);

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