<template>
  <div v-if="nameStore.name">
    Welcome to New note page, {{ nameStore.name }}
  </div>
</template>

<script setup>
import { watchEffect } from "vue";
import { nameStore } from "../store/nameStore";
import { useRouter } from "vue-router";

const router = useRouter();

watchEffect(() => {
  if (!nameStore.name) {
    router.push("/");
  }
});
</script>

<style lang="scss" scoped></style>
