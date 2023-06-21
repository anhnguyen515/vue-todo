<template>
  <div class="notes-container">
    <div class="cta-area">
      <Button color="secondary" variant="outlined" @click="router.back()">
        <template #start-icon>
          <i class="bi bi-chevron-left"></i>
        </template>
        Go back
      </Button>
      <Button
        variant="outlined"
        @click="router.push('/new-note')"
        class="flex-btn"
      >
        Create a new note
      </Button>
    </div>

    <template v-if="currentUserNotesList.length > 0">
      <Note v-for="note in currentUserNotesList" :note="note" />
    </template>

    <template v-else>
      <h1 style="text-align: center">It's empty here...</h1>
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuth } from "../composables/useAuth";
import { nameStore } from "../store/nameStore";
import { noteStore } from "../store/noteStore";
import Button from "../components/Button.vue";
import { useRouter } from "vue-router";
import Note from "../components/Note.vue";

const router = useRouter();

const currentUserNotesList = computed(() =>
  noteStore.notesList.filter((item) => item.username === nameStore.currentUser)
);

useAuth();
</script>

<style lang="scss" scoped>
@import "../assets/root.scss";

.notes-container {
  display: flex;
  flex-direction: column;
  gap: $padding-2;
  max-width: 30rem;
  width: 100%;
}
.cta-area {
  display: flex;
  gap: $padding-2;

  .flex-btn {
    flex: 1;
  }
}
</style>
