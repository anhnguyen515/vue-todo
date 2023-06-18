<script setup>
import Button from "./components/Button.vue";
</script>

<template>
  <div class="app-wrapper">
    <h1>Hello there, fella!</h1>
    <p>How can I help you?</p>
    <div class="btn-group">
      <Button>I want to create a new note</Button>
      <Button color="secondary">I want to check my notes list</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./assets/root";
.app-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  gap: $padding-2;

  p {
    font-size: $font-large;
  }

  .btn-group {
    margin-top: $padding-4;
    display: flex;
    gap: $padding-2;
  }
}
</style>
