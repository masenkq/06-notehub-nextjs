import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/api';
import NotesClient from './Notes.client';
import { getQueryClient } from '@/lib/utils/getQueryClient';

export default async function NotesPage() {
  const queryClient = getQueryClient();
  
  try {
    await queryClient.prefetchQuery({
      queryKey: ['notes', '', 1],
      queryFn: () => fetchNotes('', 1),
    });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient />
      </HydrationBoundary>
    );
  } catch (error) {
    console.error('Error prefetching notes:', error);
    return (
      <div>
        <p>Error loading notes</p>
      </div>
    );
  }
}