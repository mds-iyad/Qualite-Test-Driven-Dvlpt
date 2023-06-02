import React, { useState, useEffect } from 'react';
import {useNoteStore} from './noteForm';
import {NoteItem} from './noteItem'



export const NoteList: React.FC = () => {
    const notes = useNoteStore((state) => state.notes);
    const searchTerm = useNoteStore((state) => state.searchTerm);
    const sortBy = useNoteStore((state) => state.sortBy);
    const sortOrder = useNoteStore((state) => state.sortOrder);
  
    const filteredNotes = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const sortedNotes = filteredNotes.sort((a, b) => {
      const factor = sortOrder === 'asc' ? 1 : -1;
  
      if (sortBy === 'creationDate') {
        return factor * (new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime());
      } else if (sortBy === 'note') {
        return factor * (a.content - b.content);
      }
  
      return 0;
    });
  
    return (
      <div className="note-list">
        {sortedNotes.map((note) => (
          <NoteItem data-testid="note-title" key={note.id} note={note} />
        ))}
      </div>
    );
  };