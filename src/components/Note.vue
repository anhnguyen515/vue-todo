<template>
  <div
    class="note-container"
    :class="{
      done: note.done,
      reminder: note.type === 'Reminder',
    }"
  >
    <div class="cta-area">
      <h2>
        {{ note.name }}
        <i v-if="note.done" class="bi bi-check checked"></i>
      </h2>
      <div class="cta-area">
        <i
          v-if="note.type === 'Reminder'"
          :class="[
            'bi',
            note.done ? 'bi-dash-square' : 'bi-check-square',
            note.done ? 'indeterminate' : 'checked',
          ]"
          style="cursor: pointer"
          @click="
            note.done ? handleMarkAsUndone(note.id) : handleMarkAsDone(note.id)
          "
        ></i>
        <i
          class="bi bi-x-square removed"
          style="cursor: pointer"
          @click="handleDeleteNote(note.id)"
        ></i>
      </div>
    </div>
    <div class="note-content">
      <div
        v-if="note.type === 'Todo'"
        v-for="(noteItem, index) in note.content"
        class="note-item"
      >
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
      <div v-else>
        {{ note.content }}
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

const unfinishedTodoArr = computed(() => {
  if (
    noteStore.notesList.filter((item) => item.id === props.note.id)[0].type ===
    "Todo"
  ) {
    return noteStore.notesList
      .filter((item) => item.id === props.note.id)[0]
      .content.filter((i) => !i.checked);
  }
});

function handleChangeCheckedValue(noteId, contentId, event) {
  noteStore.updateNote(noteId, contentId, event);
  if (unfinishedTodoArr.value.length === 0 && !props.note.done) {
    handleMarkAsDone(noteId);
  }

  if (unfinishedTodoArr.value.length > 0 && props.note.done) {
    handleMarkAsUndone(noteId);
  }
}

function handleMarkAsDone(noteId) {
  noteStore.markNoteAsDone(noteId);
}

function handleMarkAsUndone(noteId) {
  noteStore.markNoteAsUndone(noteId);
}

function handleDeleteNote(noteId) {
  noteStore.removeNote(noteId);
}
</script>

<style lang="scss" scoped>
@import "../assets/root.scss";

.note-container {
  background-color: lighten($info, 45);
  border: 2px solid $info;
  border-radius: $padding-1;
  padding: $padding-2 $padding-4;
  transition: background-color 0.2s, border-color 0.2s;

  &.reminder {
    background-color: lighten($warning, 45);
    border-color: $warning;
  }

  &.done {
    background-color: lighten($success, 45);
    border-color: $success;
  }

  .cta-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    word-break: break-all;
    gap: $padding-2;
  }

  .checked {
    color: $success;
    font-size: $font-large;
  }

  .indeterminate {
    color: $warning;
    font-size: $font-large;
  }

  .removed {
    color: $danger;
    font-size: $font-large;
  }

  .note-id {
    color: $gray-600;
  }

  .note-content {
    margin-top: $padding-2;
    white-space: pre;
    line-height: $font-large;
    width: 100%;
    color: $gray-700;

    .note-item {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: $padding-2;

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
