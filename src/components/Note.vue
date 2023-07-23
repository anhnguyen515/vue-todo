<template>
  <div
    class="note-container"
    :class="{
      done: note.done,
      reminder: note.type === 'Reminder',
    }"
  >
    <div class="cta-area">
      <div>
        <h2 v-if="!isEditing">
          {{ note.name }}
          <i v-if="note.done" class="bi bi-check checked"></i>
        </h2>
        <Input v-else v-model="newNoteTitle" placeholder="Edit note's name" />
        <p class="note-date">{{ formattedDate }}</p>
      </div>
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
      <template v-if="!isEditing">
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
      </template>
      <template v-else>
        <Input
          v-model="newNoteContent"
          input-type="textarea"
          placeholder="Edit note's content"
        />
      </template>
      <i
        v-if="!isEditing"
        class="bi bi-pencil-square edit"
        @click="toggleEditing(note)"
      ></i>
      <div v-if="isEditing" class="edit-area">
        <Button variant="outlined" size="small" @click="toggleEditing(note)">
          Cancel
        </Button>
        <Button
          :disabled="!newNoteContent"
          size="small"
          @click="handleUpdateNoteContent(note)"
        >
          Save
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { noteStore } from "../store/noteStore";
import Input from "./Input.vue";
import Button from "./Button.vue";
import * as dayjs from "dayjs";

const isEditing = ref(false);
const newNoteTitle = ref("");
const newNoteContent = ref("");

const props = defineProps({
  note: { type: Object, required: true },
});

const formattedDate = computed(() => {
  if (props.note.created_at === props.note.updated_at) {
    return `${dayjs(props.note.created_at).format("HH:mm:ss, ddd MM/DD/YYYY")}`;
  } else {
    return `${dayjs(props.note.updated_at).format(
      "HH:mm:ss, ddd MM/DD/YYYY"
    )} (edited)`;
  }
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

const newNoteContentList = computed(() => {
  const contentArr = [];
  newNoteContent.value.split("\n").forEach((item, index) => {
    contentArr.push({
      id: index,
      content: item,
      checked: false,
    });
  });

  return contentArr;
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

function toggleEditing(note) {
  isEditing.value = !isEditing.value;
  if (isEditing.value) {
    newNoteTitle.value = note.name;
    newNoteContent.value = note.raw_content;
  }
}

function handleUpdateNoteContent(note) {
  noteStore.updateNoteContent(note.id, {
    ...note,
    name: newNoteTitle.value,
    content:
      note.type === "Todo" ? newNoteContentList.value : newNoteContent.value,
    raw_content: newNoteContent.value,
    updated_at: new Date(),
  });
  isEditing.value = !isEditing.value;
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

  .note-date {
    font-size: $font-small;
    color: $gray-700;
    margin-top: $padding-1;
  }

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
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    word-break: break-all;
    gap: $padding-1;
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
    position: relative;

    .edit-area {
      display: flex;
      align-items: center;
      gap: $padding-1;
      justify-content: flex-end;
    }

    .edit {
      display: none;
      color: $info;
      font-size: $font-large;
      cursor: pointer;
      position: absolute;
      right: 0;
      bottom: 0;
    }

    &:hover {
      .edit {
        display: block;
      }
    }

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
