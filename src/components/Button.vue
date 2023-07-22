<template>
  <button
    :disabled="disabled"
    @click="emit('click')"
    :class="{ [color]: true, [variant]: true, [size]: true, disabled }"
  >
    <slot name="start-icon"></slot>
    <slot></slot>
    <slot name="end-icon"></slot>
  </button>
</template>

<script setup>
const emit = defineEmits(["click"]);
const props = defineProps({
  disabled: { type: Boolean, default: false },
  color: { type: String, default: "primary" },
  variant: { type: String, default: "contained" },
  size: { type: String, default: "regular" },
});
</script>

<style lang="scss" scoped>
@import "../assets/root";
@import "./button";

@each $name, $value in $palette {
  @each $variant in $variants {
    @each $size in $sizes {
      .#{$name}.#{$variant}.#{$size} {
        @include button($value, $variant, $size);
        &.disabled {
          background-color: $gray-500;
          border: 1px solid $gray-500;
          pointer-events: none;
        }
      }
    }
  }
}
</style>
