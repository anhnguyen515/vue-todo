<script setup>
import { ref, watch, watchEffect } from "vue";
import { RouterLink } from "vue-router";
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import { debounce } from "../utils";
import { nameStore } from "../store/nameStore";

const value = ref("");

watchEffect(() => {
  const localName = localStorage.getItem("username");
  if (localName) {
    nameStore.updateName(JSON.parse(localName));
  }
});

const nameInputDebounce = debounce((value) => {
  nameStore.updateName(value);
});

const handleResetName = () => {
  value.value = "";
  nameStore.resetName();
};

watch(value, (newValue) => {
  if (newValue) {
    nameInputDebounce(newValue);
  }
});
</script>

<template>
  <div class="app-wrapper">
    <template v-if="nameStore.name">
      <h1>Hello there, {{ nameStore.name }}!</h1>
      <p>How can I help you?</p>
      <div class="btn-group">
        <RouterLink to="/new-note">
          <Button variant="outlined">I want to create a new note</Button>
        </RouterLink>
        <RouterLink to="/notes-list">
          <Button color="secondary" variant="outlined">
            I want to check my notes list
          </Button>
        </RouterLink>
      </div>
      <span class="name-reset" @click="handleResetName">It's not me</span>
    </template>
    <template v-else>
      <h1>May I ask who I am talking to?</h1>
      <Input v-model="value" class="name-input" text-align="center" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/root.scss";
.app-wrapper {
  .name-input {
    margin-top: $padding-2;
  }

  p {
    font-size: $font-large;
  }

  .btn-group {
    margin-top: $padding-4;
    display: flex;
    gap: $padding-2;
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
