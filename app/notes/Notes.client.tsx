'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '../../lib/api';
import NoteList from '../../components/NoteList/NoteList';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import css from './Notes.module.css';

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debounce pro search
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearchTerm(value);
    setPage(1); // Reset page na 1 při změně search
  }, 300);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, debouncedSearchTerm],
    queryFn: () => fetchNotes(page, debouncedSearchTerm),
    placeholderData: (previousData) => previousData, // Pro plynulou paginaci
  });

  if (error) {
    throw error;
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.container}>
      <header className={css.toolbar}>
        <SearchBox 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        <Pagination
          pageCount={data?.total ? Math.ceil(data.total / 12) : 0}
          currentPage={page - 1}
          onPageChange={(selected) => setPage(selected.selected + 1)}
        />
        <button 
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      {data && data.data.length > 0 && (
        <NoteList notes={data.data} />
      )}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm 
            onClose={handleCloseModal}
            onSuccess={handleSuccess} 
          />
        </Modal>
      )}
    </div>
  );
}