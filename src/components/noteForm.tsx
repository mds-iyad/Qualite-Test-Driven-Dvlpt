import React, { useState, useEffect } from 'react';
import {Note, NoteState} from './Note';
import create from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'




export const useNoteStore = create<NoteState>(persist((set) => ({
  notes: [],
  searchTerm: '',
  sortBy: 'creationDate',
  sortOrder: 'desc',
  addNote: (note) => set((state) => {
    return { notes: [...state.notes, note] }
  }),
  deleteNote: (id) => set((state) => ({ notes: state.notes.filter((note) => note.id !== id) })),
  updateNote: (id, updatedNote) =>
    set((state) => ({
      notes: state.notes.map((note) => (note.id === id ? updatedNote : note)),
    })),
  setSearchTerm: (term) => set(() => ({ searchTerm: term })),
  setSortBy: (value) => set(() => ({ sortBy: value })),
  setSortOrder: (order) => set(() => ({ sortOrder: order })),
  reset: () => set(() => ({   notes: [],
    searchTerm: '',
    sortBy: 'creationDate',
    sortOrder: 'desc' })),
}),
{
  name: 'note-storage',
  storage: createJSONStorage( ()=> sessionStorage),
}
));

export const NoteForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(0);
  const [comment, setComment] = useState('');

  const addNote = useNoteStore((state) => state.addNote);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newNote: Note = {
      id: new Date().getTime(),
      title,
      content,
      comment,
      creationDate: new Date().toLocaleString(),
    };

    addNote(newNote);

    setTitle('');
    setContent(0);
    setComment('');
  };

  console.log(title)

  return (
    <form onSubmit={handleSubmit} data-testid="form">
      <input data-testid="input-title"
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input data-testid="input-note"
        type="number"
        placeholder="Note"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></input>
      <textarea data-testid="input-comment"
        placeholder="Commentaire"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      ></textarea>
      <button data-testid="add-button" type="submit">Ajouter</button>
    </form>
  );
};