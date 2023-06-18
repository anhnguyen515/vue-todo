<template>
  <button @click="emit('click')" :class="{ [color]: true, [variant]: true }">
    <slot>Content</slot>
  </button>
</template>

<script setup>
const emit = defineEmits(["click"]);
const props = defineProps({
  color: { type: String, default: "primary" },
  variant: { type: String, default: "contained" },
});
</script>

<style lang="scss" scoped>
@import "../assets/root";
@import "./button";

@each $name, $value in $palette {
  @each $variant in $variants {
    .#{$name}.#{$variant} {
      @include button($value, $variant);
    }
  }
}
</style>
