import { reactive } from "vue";

export const noteStore = reactive({
  notesList: [],
  updateNotesList(notesList) {
    this.notesList = [...notesList];
    localStorage.setItem("notesList", JSON.stringify(this.notesList));
  },
  addNote(noteObj) {
    this.notesList.push(noteObj);
    localStorage.setItem("notesList", JSON.stringify(this.notesList));
  },
  removeNote(noteId) {
    this.notesList.filter((item) => item.id !== noteId);
    localStorage.setItem("notesList", JSON.stringify(this.notesList));
  },
});
