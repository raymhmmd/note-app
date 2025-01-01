// NoteItem.jsx
import React from "react";

const NoteItem = ({ note, onDelete, onArchive }) => {
  const formattedDate = new Date(note.createdAt).toLocaleDateString("id-ID", {
    weekday: "long", // Hari dalam minggu
    year: "numeric", // Tahun
    month: "long", // Bulan
    day: "numeric", // Tanggal
  });

  return (
    <div className="note-item">
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <p className="note-item__date">{formattedDate}</p>
      <button
        onClick={() => onDelete(note.id)}
        className="note-item__delete-button"
      >
        Hapus
      </button>
      <button
        onClick={() => onArchive(note.id)}
        className="note-item__archive-button"
      >
        {note.archived ? "Pindahkan ke Aktif" : "Arsipkan"}
      </button>
    </div>
  );
};

export default NoteItem;
