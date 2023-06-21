import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import { nameStore } from "../store/nameStore";
import { noteStore } from "../store/noteStore";

export function useAuth() {
  const router = useRouter();

  watchEffect(() => {
    const usersList = JSON.parse(localStorage.getItem("usersList"));
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const notesList = JSON.parse(localStorage.getItem("notesList"));

    if (usersList && usersList.length > 0) {
      nameStore.updateUsersList(usersList);
    }

    if (currentUser) {
      nameStore.updateCurrentUser(currentUser);
      if (notesList && notesList.length > 0) {
        noteStore.updateNotesList(notesList);
      }
    } else {
      router.replace("/");
    }
  });
}
