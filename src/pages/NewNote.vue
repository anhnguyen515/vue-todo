<template>
  <div v-if="nameStore.name">
    Welcome to New note page, {{ nameStore.name }}
  </div>
</template>

<script setup>
import { useCheckUsernameExists } from "../composables/useCheckUsernameExists";
import { nameStore } from "../store/nameStore";

useCheckUsernameExists();
</script>

<style lang="scss" scoped></style>
