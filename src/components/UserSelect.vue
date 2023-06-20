<template>
  <Popper offsetDistance="4">
    <Button color="secondary">
      {{ selectLabel }}
      <template #end-icon>
        <i class="bi bi-chevron-down"></i>
      </template>
    </Button>
    <template #content>
      <div class="select-dropdown">
        <div v-for="option in nameStore.usersList" class="select-item">
          <span @click="handleSelectValue(option)" class="select-label">
            {{ option }}
          </span>
          <span @click="nameStore.removeUser(option)">
            <i class="bi bi-trash"></i>
          </span>
        </div>
      </div>
    </template>
  </Popper>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { nameStore } from "../store/nameStore";
import Button from "./Button.vue";

const selectValue = ref("");

const selectLabel = computed(() => selectValue.value || "Select a user");

watch(selectValue, (newValue) => {
  nameStore.updateCurrentUser(newValue);
});

function handleSelectValue(value) {
  selectValue.value = value;
}
</script>

<style lang="scss" scoped>
@import "../assets/root.scss";

.select-dropdown {
  background-color: $secondary;
  border: 1px solid $gray-300;
  border-radius: $padding-1;
  font-size: $font-regular;
  font-weight: 500;
  display: flex;
  flex-direction: column;

  .select-item {
    display: flex;
    gap: $padding-4;
    align-items: center;
    justify-content: space-between;
    transition: background-color 0.2s;
    cursor: pointer;
    padding-right: $padding-4;

    &:hover {
      background-color: $gray-200;
    }

    .select-label {
      padding: $padding-2 $padding-4;
    }

    .bi-trash {
      transition: color 0.2s;
      color: $gray-600;

      &:hover {
        color: $danger;
      }
    }
  }
}
</style>
