import { reactive } from "vue";
import { saveToLocalStorage } from "../utils";

export const noteStore = reactive({
  notesList: [],
  addNote(noteObj) {
    this.notesList.push(noteObj);
    saveToLocalStorage("notesList", this.notesList);
  },
  removeNote(noteId) {
    this.notesList = this.notesList.filter((item) => item.id !== noteId);
    saveToLocalStorage("notesList", this.notesList);
  },
  updateNote(noteId, contentId, event) {
    this.notesList.filter((item) => item.id === noteId)[0].content[
      contentId
    ].checked = event.target.checked;
    saveToLocalStorage("notesList", this.notesList);
  },
  updateNoteContent(noteId, note) {
    const noteIndex = this.notesList.findIndex((item) => item.id === noteId);
    this.notesList[noteIndex].name = note.name;
    this.notesList[noteIndex].content = note.content;
    this.notesList[noteIndex].raw_content = note.raw_content;
    this.notesList[noteIndex].updated_at = note.updated_at;
    saveToLocalStorage("notesList", this.notesList);
  },
  markNoteAsDone(noteId) {
    this.notesList.filter((item) => item.id === noteId)[0].done = true;
    saveToLocalStorage("notesList", this.notesList);
  },
  markNoteAsUndone(noteId) {
    this.notesList.filter((item) => item.id === noteId)[0].done = false;
    saveToLocalStorage("notesList", this.notesList);
  },
  updateNotesList(notesList) {
    this.notesList = [...notesList];
    saveToLocalStorage("notesList", this.notesList);
  },
});
