// src/components/NoteInput.jsx
import React, { useState } from "react";


const NoteInput = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");


  const handleAdd = (e) => {
    e.preventDefault();
    if (title && body) {
      const newNote = {

        id: +new Date(), // Menggunakan timestamp untuk id
        title,
        body,
        archived: false,
        createdAt: new Date().toISOString(),
      };
      onAdd(newNote);
      setTitle("");
      setBody("");
    }
  };

  return (
    <div className="note-input">
      <h2>Tambah Catatan</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Isi catatan"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Simpan Catatan</button>
      </form>
    </div>
  );
};

export default NoteInput;
