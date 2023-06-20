<template>
  <input
    v-if="inputType === 'input'"
    class="input"
    :class="{ error: inputError, disabled }"
    :disabled="disabled"
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
    :style="inputStyle"
  />
  <textarea
    v-else
    rows="5"
    class="input"
    :class="{ error: inputError, disabled }"
    :disabled="disabled"
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
    :style="inputStyle"
  ></textarea>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: String,
  // placeholder: { type: String, default: "" },
  textAlign: { type: String, default: "left" },
  inputError: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  inputType: { type: String, default: "input" },
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
  background-color: $secondary;
  border: none;
  border-radius: 4px;
  font-size: $font-regular;
  font-weight: 500;
  padding: $padding-2;
  transition: background-color 0.2s;

  &:hover {
    background-color: darken($secondary, 10%);
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
