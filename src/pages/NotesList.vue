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
      <Select
        :options-list="sortOptions"
        placeholder="Sorted by"
        :handle-select-item="handleSelectSortOption"
      />
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
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "../components/Button.vue";
import Note from "../components/Note.vue";
import Select from "../components/Select.vue";
import { useAuth } from "../composables/useAuth";
import { nameStore } from "../store/nameStore";
import { noteStore } from "../store/noteStore";
import { saveToLocalStorage } from "../utils";

const router = useRouter();
const sortOptions = ["Name", "Date added", "Date updated"];
const selectedSortOption = ref("");

const currentUserNotesList = computed(() => {
  let returnList = noteStore.notesList.filter(
    (item) => item.username === nameStore.currentUser
  );

  if (selectedSortOption.value) {
    if (selectedSortOption.value === "Name") {
      return returnList.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    } else if (selectedSortOption.value === "Date added") {
      return returnList.sort((a, b) => {
        const dateA = a.created_at;
        const dateB = b.created_at;
        if (dateA > dateB) {
          return -1;
        }
        if (dateA < dateB) {
          return 1;
        }
        return 0;
      });
    } else {
      return returnList.sort((a, b) => {
        const dateA = a.updated_at;
        const dateB = b.updated_at;
        if (dateA > dateB) {
          return -1;
        }
        if (dateA < dateB) {
          return 1;
        }
        return 0;
      });
    }
  } else {
    return returnList;
  }
});

useAuth();

function handleSelectSortOption(value) {
  selectedSortOption.value = value;
}
</script>

<style lang="scss" scoped>
@import "../assets/root.scss";

.notes-container {
  display: flex;
  flex-direction: column;
  gap: $padding-2;
  max-width: 40rem;
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
