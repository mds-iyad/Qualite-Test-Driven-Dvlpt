import React, { useState, useEffect } from 'react';
import {Note, NoteState} from './Note';
import {useNoteStore,NoteForm} from './noteForm';

export const NoteItem: React.FC<{ note: Note }> = ({ note }) => {
    const deleteNote = useNoteStore((state) => state.deleteNote);
    const updateNote = useNoteStore((state) => state.updateNote);
  
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(note.title);
    const [editedContent, setEditedContent] = useState(note.content);
    const [editedComment, setEditedComment] = useState(note.comment);
  
    const handleDelete = () => {
      // if (window.confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) 
      // {
      //   deleteNote(note.id);
      // }
      deleteNote(note.id);
    };
  
    const handleEdit = () => {
      setIsEditing(true);
    };
  
    const handleSave = () => {
      const updatedNote: Note = {
        ...note,
        title: editedTitle,
        content: editedContent,
        comment: editedComment,
      };
      updateNote(note.id, updatedNote);
      setIsEditing(false);
    };
    const getNoteColor = (note: Note): string => {
      const noteLength = note.content;
      if (noteLength < 8) {
        return 'red';
      } else if (noteLength < 10) {
        return 'orange';
      } else if (noteLength < 13) {
        return 'yellow';
      } else {
        return 'green';
      }
    };
  
    return (
      <div className="note-item" style={{ backgroundColor: getNoteColor(note) }}>
        <div className="note-info">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            <h3 data-testid="note-title">{note.title}</h3>
          )}
          <p>{note.creationDate}</p>
          {isEditing ? (
            <textarea value={editedComment} onChange={(e) => setEditedComment(e.target.value)} />
          ) : (
            <p>{note.comment.substring(0, 100)}</p>
          )}
          {isEditing ? (
            <input value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
          ) : (
            <p>{note.content}</p>
          )}
        </div>
        <div className="note-actions">
          {isEditing ? (
            <button onClick={handleSave}>Enregistrer</button>
          ) : (
            <>
              <button onClick={handleEdit}>Modifier</button>
              <button onClick={handleDelete}>Supprimer</button>
            </>
          )}
        </div>
      </div>
    );
  };