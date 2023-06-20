<template>
  <h1>Add your new note here, {{ nameStore.currentUser }}</h1>
  <div class="form-container">
    <Input
      v-model="noteValue"
      input-type="textarea"
      placeholder="What do I need to do?"
    />
    <Button @click="handleAddNewNote" :disabled="!noteValue">
      <template #start-icon>
        <i class="bi bi-file-earmark-plus"></i>
      </template>
      Add note
    </Button>
    <Button variant="outlined" @click="router.push('/notes-list')">
      Check notes list
    </Button>
  </div>
  <p v-if="noteAdded" class="notification">
    New note added
    <i class="bi bi-check"></i>
  </p>
</template>

<script setup>
import { useRouter } from "vue-router";
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import { useAuth } from "../composables/useAuth";
import { nameStore } from "../store/nameStore";
import { noteStore } from "../store/noteStore";
import { v4 as uuidv4 } from "uuid";
import { computed, ref, watch, watchEffect } from "vue";

const router = useRouter();

const noteValue = ref("");
const noteAdded = ref(false);
const timer = ref();

useAuth();

function handleAddNewNote() {
  clearTimeout(timer.value);

  noteStore.addNote({
    id: uuidv4(),
    username: nameStore.currentUser,
    note: noteValue.value,
  });

  noteValue.value = "";
  noteAdded.value = true;

  timer.value = setTimeout(() => {
    noteAdded.value = false;
  }, 3000);
}
</script>

<style lang="scss" scoped>
@import "../assets/root.scss";

.form-container {
  margin-top: $padding-2;
  display: flex;
  flex-direction: column;
  gap: $padding-2;
  max-width: 30rem;
  width: 100%;
}

.notification {
  margin-top: $padding-2;
  color: $success;
}
</style>
