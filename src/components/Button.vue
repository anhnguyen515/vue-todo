<template>
  <button
    :disabled="disabled"
    @click="emit('click')"
    :class="{ [color]: true, [variant]: true, disabled }"
  >
    <slot>Content</slot>
  </button>
</template>

<script setup>
const emit = defineEmits(["click"]);
const props = defineProps({
  disabled: { type: Boolean, default: false },
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
      &.disabled {
        background-color: $gray-500;
        pointer-events: none;
      }
    }
  }
}
</style>
