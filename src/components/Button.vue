<template>
  <button @click="emit('onClick')" :class="{ [color]: true, [variant]: true }">
    <slot>Content</slot>
  </button>
</template>

<script setup>
const emit = defineEmits(["onClick"]);
const props = defineProps({
  color: { type: String, default: "primary" },
  variant: { type: String, default: "contained" },
});
</script>

<style lang="scss" scoped>
@import "../assets/root";
@import "./button";

@each $palette-name, $palette-value in $palette {
  @each $variant in $variants {
    .#{$palette-name}.#{$variant} {
      @include button($palette-value, $variant);
    }
  }
}
</style>
