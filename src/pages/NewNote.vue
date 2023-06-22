<template>
  <h1>Add your new note here, {{ nameStore.currentUser }}</h1>
  <div class="form-container">
    <div class="cta-area">
      <Input
        v-model="noteName"
        placeholder="My note's name"
        class="flex-item"
      />
      <Select
        :options-list="options"
        placeholder="Type"
        :handle-select-item="handleSelectNoteType"
      ></Select>
    </div>
    <Input
      v-model="noteContent"
      input-type="textarea"
      placeholder="What do I need to do?"
    />
    <Button
      @click="handleAddNewNote"
      :disabled="
        !noteType ||
        !noteContent ||
        currentUserNotesList.length >= MAX_NOTES_LENGTH
      "
    >
      <template #start-icon>
        <i class="bi bi-file-earmark-plus"></i>
      </template>
      Add new note
    </Button>
    <div class="cta-area">
      <Button color="secondary" variant="outlined" @click="router.back()">
        <template #start-icon>
          <i class="bi bi-chevron-left"></i>
        </template>
        Go back
      </Button>
      <Button
        variant="outlined"
        @click="router.push('/notes-list')"
        class="flex-item"
      >
        Check notes list ({{ currentUserNotesList.length }}/{{
          MAX_NOTES_LENGTH
        }})
      </Button>
    </div>
  </div>
  <p class="notification" :style="{ height: noteAdded ? '20px' : 0 }">
    New note added
    <i class="bi bi-check"></i>
  </p>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import Select from "../components/Select.vue";
import { useAuth } from "../composables/useAuth";
import { MAX_NOTES_LENGTH } from "../constants";
import { nameStore } from "../store/nameStore";
import { noteStore } from "../store/noteStore";

const router = useRouter();

const noteName = ref("");
const noteContent = ref("");
const noteAdded = ref(false);
const noteType = ref("");
const timer = ref();

const options = ref(["Todo", "Reminder"]);

useAuth();

const currentUserNotesList = computed(() =>
  noteStore.notesList.filter((item) => item.username === nameStore.currentUser)
);

const noteContentList = computed(() => {
  const contentArr = [];
  noteContent.value.split("\n").forEach((item, index) => {
    contentArr.push({
      id: index,
      content: item,
      checked: false,
    });
  });

  return contentArr;
});

function handleAddNewNote() {
  clearTimeout(timer.value);

  noteStore.addNote({
    id: uuidv4(),
    name: noteName.value,
    username: nameStore.currentUser,
    content:
      noteType.value === "Todo" ? noteContentList.value : noteContent.value,
    type: noteType.value,
    done: false,
  });

  noteName.value = "";
  noteContent.value = "";
  noteType.value = "";
  noteAdded.value = true;

  timer.value = setTimeout(() => {
    noteAdded.value = false;
  }, 2000);
}

function handleSelectNoteType(value) {
  noteType.value = value;
}
</script>

<style lang="scss" scoped>
@import "../assets/root.scss";

.form-container {
  margin-top: $padding-2;
  display: flex;
  flex-direction: column;
  gap: $padding-2;
  max-width: 25rem;
  width: 100%;

  .cta-area {
    display: flex;
    gap: $padding-2;

    .flex-item {
      flex: 1;
    }
  }
}

.notification {
  margin-top: $padding-2;
  color: $success;
  overflow: hidden;
  transition: height 0.3s;
}
</style>
