import React, { useState, useEffect } from 'react';
import {useNoteStore,NoteForm} from './noteForm';
import { NoteList } from './NoteList';



const NoteApp: React.FC = () => {
  const setSearchTerm = useNoteStore((state) => state.setSearchTerm);
  const setSortBy = useNoteStore((state) => state.setSortBy);
  const setSortOrder = useNoteStore((state) => state.setSortOrder);

  return (
    <div className="note-app">
      <h1>Gestionnaire de notes</h1>
      <NoteForm />
      <input
        type="text"
        data-testid="input-search"
        placeholder="Rechercher..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select data-testid="sort-by-select" value={useNoteStore((state) => state.sortBy)} onChange={(e) => setSortBy(e.target.value)}>
        <option value="creationDate">Date de création</option>
        <option value="note">Note</option>
      </select>
      <select data-testid="sort-order-select"
        value={useNoteStore((state) => state.sortOrder)}
        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
      >
        <option value="desc">Décroissant</option>
        <option value="asc">Croissant</option>
      </select>
      <NoteList />
    </div>
  );
};

export default NoteApp;
