<script setup>
import { computed, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import Select from "../components/Select.vue";
import { nameStore } from "../store/nameStore";

const username = ref("");

const router = useRouter();

const inputError = computed(
  () => nameStore.usersList.filter((item) => item === username.value).length > 0
);

watchEffect(() => {
  const usersList = JSON.parse(localStorage.getItem("usersList"));
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (usersList?.length > 0) {
    nameStore.updateUsersList(usersList);
  }
  if (currentUser) {
    nameStore.updateCurrentUser(currentUser);
  }
});

function addNewUser() {
  if (!inputError.value) {
    nameStore.addNewUser(username.value);
    nameStore.updateCurrentUser(username.value);
  }
}

function changeUser() {
  username.value = "";
  nameStore.removeCurrentUser();
}

function handleSelectItem(value) {
  nameStore.updateCurrentUser(value);
}

function handleRemoveItem(value) {
  nameStore.removeUser(value);
}
</script>

<template>
  <div class="app-wrapper">
    <template v-if="nameStore.currentUser">
      <h1>Hello there, {{ nameStore.currentUser }}!</h1>
      <p>How can I help you?</p>
      <div class="btn-group">
        <Button @click="router.push('/new-note')">
          I want to create a new note
        </Button>
        <Button color="secondary" @click="router.push('/notes-list')">
          I want to check my notes list
        </Button>
      </div>
      <span class="name-reset" @click="changeUser">Change user</span>
    </template>
    <template v-else>
      <h1>May I ask who I am talking to?</h1>
      <div class="users-container">
        <Select
          v-if="nameStore.usersList.length > 0"
          :options-list="nameStore.usersList"
          :handle-select-item="handleSelectItem"
          :item-action="handleRemoveItem"
          placeholder="I've been here before"
        >
          <template #end-icon>
            <i class="bi bi-trash"></i>
          </template>
        </Select>
        <span
          v-if="nameStore.usersList.length > 0"
          style="display: flex; align-items: center"
        >
          or
        </span>
        <Input
          @keypress.enter="addNewUser"
          v-model="username"
          text-align="center"
          :input-error="inputError"
          placeholder="I'm a new user"
        />
        <Button :disabled="!username || inputError" @click="addNewUser">
          <i class="bi bi-plus-lg"></i>
        </Button>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/root.scss";
.app-wrapper {
  p {
    font-size: $font-large;
  }

  .btn-group {
    margin-top: $padding-4;
    display: flex;
    gap: $padding-2;
  }

  .users-container {
    display: flex;
    justify-content: center;
    gap: $padding-2;
    margin-top: $padding-2;
  }

  .name-reset {
    cursor: pointer;
    font-size: $font-small;
    margin-top: $padding-4;
    transition: color 0.2s;

    &:hover {
      color: $danger;
    }
  }
}
</style>
