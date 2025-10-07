'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';
import NoteList from '../../components/NoteList/NoteList';
import SearchBar from '../../components/SearchBox/SearchBox'; // Správný import
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import css from './Notes.module.css';

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // Změň název na searchTerm
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, searchTerm], // Použij searchTerm
    queryFn: () => fetchNotes(page, searchTerm), // Použij searchTerm
  });

  if (error) {
    throw error;
  }

  return (
    <div className={css.container}>
      <header className={css.toolbar}>
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        <Pagination
  totalPages={data?.total ? Math.ceil(data.total / 12) : 0}
  currentPage={page}
  onPageChange={(newPage) => setPage(newPage)}
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
  <Modal onClose={() => setIsModalOpen(false)}>
    <NoteForm 
      onClose={() => setIsModalOpen(false)}  // ← PŘIDEJ TENTO PROP
      onSuccess={() => setIsModalOpen(false)} 
    />
  </Modal>
)}
    </div>
  );
}