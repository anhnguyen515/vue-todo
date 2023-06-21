<template>
  <template v-if="currentUserNotesList.length > 0">
    <div class="notes-container">
      <Note v-for="note in currentUserNotesList" :note="note" />
      <Button variant="outlined" @click="router.push('/new-note')">
        Create a new note
      </Button>
    </div>
  </template>

  <template v-else>
    <h1>It's empty here...</h1>
    <div class="cta-area">
      <Button color="secondary" variant="outlined" @click="router.back()">
        <template #start-icon>
          <i class="bi bi-chevron-left"></i>
        </template>
        Go back
      </Button>
      <Button variant="outlined" @click="router.push('/new-note')">
        Create a new note
      </Button>
    </div>
  </template>
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
  gap: $padding-4;
  max-width: 30rem;
  width: 100%;
}
.cta-area {
  margin-top: $padding-2;
  display: flex;
  gap: $padding-2;
}
</style>
