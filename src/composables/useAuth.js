import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import { nameStore } from "../store/nameStore";
import { noteStore } from "../store/noteStore";
import { getFromLocalStorage } from "../utils";

export function useAuth() {
  const router = useRouter();

  watchEffect(() => {
    const usersList = getFromLocalStorage("usersList");
    const currentUser = getFromLocalStorage("currentUser");
    const notesList = getFromLocalStorage("notesList");

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
