import React, { useState, useEffect } from 'react';
import { ref, onValue, set, push, getDatabase } from 'firebase/database';
import { app } from '../firebase'; 

const db = getDatabase(app); 

const Notelist = ({ user }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', body: '', color: 'default' });

  useEffect(() => {
    if (!user) return;

    const notesRef = ref(db, `notes/${user.uid}`); // Store user-specific notes

    onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const noteList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setNotes(noteList);
      }
    });

    return () => {
      // Cleanup
      // Remove the event listener when the component unmounts
      // This is important to avoid memory leaks
    };
  }, [user]);

  const handleCreateNote = () => {
    if (!user) return; // Ensure user is authenticated

    // Create a new note
    const newNoteRef = push(ref(db, `notes/${user.uid}`));
    set(newNoteRef, {
      title: newNote.title,
      body: newNote.body,
      color: newNote.color,
      createdDate: new Date().toISOString(),
    });

    // Clear the form
    setNewNote({ title: '', body: '', color: 'default' });
  };

  return (
    <div className='notes-page'>
      <h2>Notes</h2>
      <div className="note-form">
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Note Body"
          value={newNote.body}
          onChange={(e) => setNewNote({ ...newNote, body: e.target.value })}
        />
        <select
          value={newNote.color}
          onChange={(e) => setNewNote({ ...newNote, color: e.target.value })}
        >
          <option value="default">Default</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="purple">Purple</option>
        </select>
        <button onClick={handleCreateNote}>Create Note</button>
      </div>
      <ul className="note-list">
        {notes.map((note) => (
          <li key={note.id} className={`note ${note.color}`}>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <p>Created: {note.createdDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notelist;
