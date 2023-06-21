<template>
  <div class="note-container" :class="{ 'all-checked': noteAllChecked }">
    <h2>
      {{ note.name }}
      <i v-if="noteAllChecked" class="bi bi-check checked"></i>
    </h2>
    <div class="note-content">
      <div v-for="(noteItem, index) in note.content" class="note-item">
        <input
          type="checkbox"
          :id="noteItem.content + index"
          :checked="noteItem.checked"
          @change.prevent="handleChangeCheckedValue(note.id, index, $event)"
        />
        <label :for="noteItem.content + index">
          {{ noteItem.content }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { noteStore } from "../store/noteStore";

const props = defineProps({
  note: { type: Object, required: true },
});

function handleChangeCheckedValue(noteId, contentId, event) {
  noteStore.updateNote(noteId, contentId, event);
}

const noteAllChecked = computed(() => {
  const unfinishedArr = noteStore.notesList
    .filter((item) => item.id === props.note.id)[0]
    .content.filter((i) => !i.checked);

  if (unfinishedArr.length === 0) {
    return true;
  }

  return false;
});
</script>

<style lang="scss" scoped>
@import "../assets/root.scss";

.note-container {
  border: 2px solid $gray-300;
  border-radius: $padding-1;
  padding: $padding-2 $padding-4;
  transition: background-color 0.2s, border-color 0.2s;

  &.all-checked {
    background-color: lighten($success, 46);
    border-color: $success;
  }

  .checked {
    color: $success;
  }

  &:hover {
    background-color: lighten($primary, 35);
    border-color: $primary;
  }

  .note-id {
    color: $gray-600;
  }

  .note-content {
    margin-top: $padding-3;
    white-space: pre;
    line-height: $font-large;
    width: 100%;

    .note-item {
      display: flex;
      align-items: center;
      gap: $padding-2;
      color: $gray-700;

      input[type="checkbox"] {
        accent-color: $primary;
      }

      input[type="checkbox"]:checked + label {
        text-decoration: line-through;
        color: $gray-500;
      }
    }
  }
}
</style>
