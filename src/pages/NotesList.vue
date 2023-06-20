<template>
  <div v-if="nameStore.currentUser">
    Welcome to Notes list page, {{ nameStore.currentUser }}
  </div>
</template>

<script setup>
import { useAuth } from "../composables/useAuth";
import { nameStore } from "../store/nameStore";

useAuth();
</script>

<style lang="scss" scoped></style>
