<template>
  <select class="select" v-model="selectValue">
    <option value="" disabled selected hidden>Select a user</option>
    <option v-for="(option, index) in optionsList" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup>
import { ref, watch } from "vue";
import { nameStore } from "../store/nameStore";

const selectValue = ref("");

const props = defineProps({
  optionsList: Array,
});

watch(selectValue, (newValue) => {
  nameStore.updateCurrentUser(newValue);
});
</script>

<style lang="scss" scoped>
@import "../assets/root.scss";

.select {
  background-color: $gray-200;
  border: none;
  border-radius: 4px;
  font-size: $font-regular;
  font-weight: 500;
  padding: $padding-2;
  transition: background-color 0.2s;
  min-width: 10rem;

  &:hover {
    background-color: $gray-300;
  }

  &:focus {
    outline-color: $primary;
  }
}
</style>
