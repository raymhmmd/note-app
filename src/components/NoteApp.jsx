import React, { useState, useEffect } from "react";
import NoteInput from "./NoteInput";
import NoteItem from "./NoteItem";
import NoteSearch from "./NoteSearch";
import NoteFooter from "./NoteFooter";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState(""); // State untuk menyimpan kata kunci pencarian

  // Ambil data dari localStorage saat aplikasi dimuat
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  // Tambah catatan baru
  const addNote = (newNote) => {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes, newNote];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  // Hapus catatan
  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((note) => note.id !== id);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  // Arsipkan atau pindahkan catatan ke aktif
  const toggleArchiveNote = (id) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      );
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  // Fungsi untuk menangani pencarian
  const handleSearch = (searchKeyword) => {
    setKeyword(searchKeyword);
  };

  // Filter catatan berdasarkan keyword pencarian
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(keyword.toLowerCase()) ||
      note.content.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="note-app">
      <h1>Aplikasi Catatan</h1>
      <NoteSearch keyword={keyword} onSearch={handleSearch} />{" "}
      {/* Menambahkan komponen pencarian */}
      <NoteInput onAdd={addNote} />
      <div className="notes-list">
        <h2>Catatan Aktif</h2>
        {filteredNotes
          .filter((note) => !note.archived)
          .map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onDelete={deleteNote}
              onArchive={toggleArchiveNote}
            />
          ))}
      </div>
      <div className="notes-list-archived">
        <h2>Catatan Arsip</h2>
        {filteredNotes
          .filter((note) => note.archived)
          .map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onDelete={deleteNote}
              onArchive={toggleArchiveNote}
            />
          ))}
      </div>
      <NoteFooter />
    </div>
  );
};

export default App;
