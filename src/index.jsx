import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles/style.css";
import { getInitialData } from "./utils/index.js";
import NoteApp from "./components/NoteApp.jsx";

const App = () => {
  const [notes, setNotes] = useState(getInitialData());
  const [keyword, setKeyword] = useState("");

  const addNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const archiveNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
    console.log(notes);
  };

  const handleSearch = (keyword) => {
    setKeyword(keyword);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="note-app">
      <NoteApp/>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
