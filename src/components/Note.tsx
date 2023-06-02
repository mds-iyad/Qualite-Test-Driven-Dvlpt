
export interface Note {
    id: number;
    title: string;
    content: number;
    comment: string;
    creationDate: string;
  }
  
export type NoteState = {
    notes: Note[];
    searchTerm: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    addNote: (note: Note) => void;
    deleteNote: (id: number) => void;
    updateNote: (id: number, updatedNote: Note) => void;
    setSearchTerm: (term: string) => void;
    setSortBy: (value: string) => void;
    setSortOrder: (order: 'asc' | 'desc') => void;
  };