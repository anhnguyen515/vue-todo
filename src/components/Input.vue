<template>
  <input
    class="input"
    :class="{ error: inputError, disabled }"
    :disabled="disabled"
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
    :style="inputStyle"
  />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: String,
  // placeholder: { type: String, default: "" },
  textAlign: { type: String, default: "left" },
  inputError: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});
const emit = defineEmits(["update:modelValue"]);

const inputStyle = computed(() => {
  return {
    textAlign: props.textAlign,
  };
});
</script>

<style lang="scss" scoped>
@import "../assets/root.scss";

.input {
  background-color: $gray-200;
  border: none;
  border-radius: 4px;
  font-size: $font-regular;
  font-weight: 500;
  padding: $padding-2;
  transition: background-color 0.2s;

  &:hover {
    background-color: $gray-300;
  }

  &:focus {
    outline-color: $primary;
  }

  &.error {
    outline-color: $danger;
  }

  &.disabled {
    background-color: $gray-500;
    pointer-events: none;
  }
}
</style>
