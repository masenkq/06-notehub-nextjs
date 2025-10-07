import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { queryClient } from '../../lib/queryClient';
import { fetchNotes } from '../../lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () => fetchNotes(1, ''),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}