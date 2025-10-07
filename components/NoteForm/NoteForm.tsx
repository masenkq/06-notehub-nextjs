'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../lib/api';
import { Note, NoteTag } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Partial<Note>;
}

export default function NoteForm({ onClose, onSuccess, initialData }: NoteFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [tag, setTag] = useState<NoteTag>(initialData?.tag || 'Personal'); // Přidej state pro tag
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onSuccess();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      return;
    }

    mutation.mutate({
      title: title.trim(),
      content: content.trim(),
      tag: tag, // Přidej tag
    });
  };

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <h2 className={css.title}>
          {initialData ? 'Edit Note' : 'Create New Note'}
        </h2>
        
        <form onSubmit={handleSubmit} className={css.form}>
          <div className={css.field}>
            <label htmlFor="title" className={css.label}>
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={css.input}
              placeholder="Enter note title"
              required
            />
          </div>
          
          <div className={css.field}>
            <label htmlFor="content" className={css.label}>
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={css.textarea}
              placeholder="Enter note content"
              rows={6}
              required
            />
          </div>

          {/* Přidej select pro tag */}
          <div className={css.field}>
            <label htmlFor="tag" className={css.label}>
              Tag
            </label>
            <select
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value as NoteTag)}
              className={css.select}
              required
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </select>
          </div>
          
          <div className={css.actions}>
            <button
              type="button"
              onClick={onClose}
              className={css.cancelButton}
              disabled={mutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={mutation.isPending || !title.trim() || !content.trim()}
            >
              {mutation.isPending ? 'Saving...' : 'Save Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}