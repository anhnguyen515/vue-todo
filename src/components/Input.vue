<template>
  <input
    v-if="inputType === 'input'"
    class="input"
    :class="{ error: inputError, disabled }"
    :disabled="disabled"
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
    :style="inputStyle"
    :autofocus="autoFocus"
  />
  <div v-else class="textarea-wrapper">
    <textarea
      rows="5"
      class="input textarea"
      :class="{ error: inputError, disabled }"
      :disabled="disabled"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      maxlength="100"
      :style="inputStyle"
      :autofocus="autoFocus"
    ></textarea>
    <span class="character-limit">{{ modelValue.length }}/100</span>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: String,
  placeholder: { type: String, default: "" },
  textAlign: { type: String, default: "left" },
  inputError: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  inputType: { type: String, default: "input" },
  autoFocus: { type: Boolean, default: false },
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

  &.textarea {
    width: 100%;
    resize: none;
  }
}
.textarea-wrapper {
  position: relative;
  width: auto;

  .character-limit {
    position: absolute;
    right: $padding-1;
    bottom: $padding-2;
    font-size: $font-small;
    color: $gray-600;
  }
}
</style>
