import { notesData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const notesGrid = document.getElementById('notesGrid');
  notesData.forEach(note => {
    const noteItem = document.createElement('note-item');
    noteItem.setAttribute('title', note.title);
    noteItem.setAttribute('body', note.body);
    noteItem.setAttribute('created-at', new Date(note.createdAt).toLocaleString());
    notesGrid.appendChild(noteItem);
  });
});
