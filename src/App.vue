<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="app-wrapper">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
@import "./assets/root.scss";
.app-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  gap: $padding-2;
}
</style>
