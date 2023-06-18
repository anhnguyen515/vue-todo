import { watchEffect } from "vue";
import { nameStore } from "../store/nameStore";
import { useRouter } from "vue-router";

export function useCheckUsernameExists() {
  const router = useRouter();

  watchEffect(() => {
    if (!nameStore.name) {
      router.replace("/");
    }
  });
}
