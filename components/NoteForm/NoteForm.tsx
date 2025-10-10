'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createNote } from '../../lib/api';
import { Note, NoteTag } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Partial<Note>;
}

// Yup validační schema
const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters')
    .required('Title is required'),
  content: Yup.string()
    .max(500, 'Content must be at most 500 characters'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
    .required('Tag is required'),
});

export default function NoteForm({ onClose, onSuccess, initialData }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onSuccess();
    },
  });

  const initialValues = {
    title: initialData?.title || '',
    content: initialData?.content || '',
    tag: initialData?.tag || 'Personal' as NoteTag,
  };

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <h2 className={css.title}>
          {initialData ? 'Edit Note' : 'Create New Note'}
        </h2>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            mutation.mutate(values, {
              onSettled: () => {
                setSubmitting(false);
              }
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form className={css.form}>
              <div className={css.field}>
                <label htmlFor="title" className={css.label}>
                  Title
                </label>
                <Field
                  id="title"
                  type="text"
                  name="title"
                  className={css.input}
                  placeholder="Enter note title"
                />
                <ErrorMessage name="title" component="span" className={css.error} />
              </div>
              
              <div className={css.field}>
                <label htmlFor="content" className={css.label}>
                  Content
                </label>
                <Field
                  as="textarea"
                  id="content"
                  name="content"
                  className={css.textarea}
                  placeholder="Enter note content"
                  rows={6}
                />
                <ErrorMessage name="content" component="span" className={css.error} />
              </div>

              <div className={css.field}>
                <label htmlFor="tag" className={css.label}>
                  Tag
                </label>
                <Field
                  as="select"
                  id="tag"
                  name="tag"
                  className={css.select}
                >
                  <option value="Todo">Todo</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Shopping">Shopping</option>
                </Field>
                <ErrorMessage name="tag" component="span" className={css.error} />
              </div>
              
              <div className={css.actions}>
                <button
                  type="button"
                  onClick={onClose}
                  className={css.cancelButton}
                  disabled={isSubmitting || mutation.isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={css.submitButton}
                  disabled={isSubmitting || mutation.isPending}
                >
                  {mutation.isPending ? 'Saving...' : 'Save Note'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}