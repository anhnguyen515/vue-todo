import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import { nameStore } from "../store/nameStore";

export function useAuth() {
  const router = useRouter();

  watchEffect(() => {
    const usersList = JSON.parse(localStorage.getItem("usersList"));
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (usersList && usersList.length > 0) {
      nameStore.updateUsersList(usersList);
    }

    if (currentUser) {
      nameStore.updateCurrentUser(currentUser);
    } else {
      router.replace("/");
    }
  });
}
