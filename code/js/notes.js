let notes = JSON.parse(localStorage.getItem('notes')) || [];

function saveNote() {
  const noteInput = document.getElementById('note-input');
  const note = noteInput.value;
  if (note) {
    notes.push(note);
    noteInput.value = ''; // Clear the input
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
  }
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
}

function renderNotes() {
  const notesContainer = document.getElementById('notes-container');
  notesContainer.innerHTML = '';
  notes.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.innerHTML = `
      <p>${note}</p>
      <button onclick="deleteNote(${index})">Delete</button>
    `;
    notesContainer.appendChild(noteElement);
  });
}

// Render notes on initial load
document.addEventListener('DOMContentLoaded', renderNotes);
