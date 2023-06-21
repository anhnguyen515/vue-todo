import { reactive } from "vue";

export const noteStore = reactive({
  notesList: [],
  addNote(noteObj) {
    this.notesList.push(noteObj);
    localStorage.setItem("notesList", JSON.stringify(this.notesList));
  },
  removeNote(noteId) {
    this.notesList.filter((item) => item.id !== noteId);
    localStorage.setItem("notesList", JSON.stringify(this.notesList));
  },
  updateNote(noteId, contentId, event) {
    this.notesList.filter((item) => item.id === noteId)[0].content[
      contentId
    ].checked = event.target.checked;
    localStorage.setItem("notesList", JSON.stringify(this.notesList));
  },
  updateNotesList(notesList) {
    this.notesList = [...notesList];
    localStorage.setItem("notesList", JSON.stringify(this.notesList));
  },
});
