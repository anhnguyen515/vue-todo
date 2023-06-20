<template>
  <Popper offsetDistance="4">
    <Button color="secondary" ref="selectRef">
      {{ selectLabel }}
      <template #end-icon>
        <i class="bi bi-chevron-down"></i>
      </template>
    </Button>
    <template #content>
      <div class="select-dropdown" :style="dropdownStyle">
        <div v-for="option in optionsList" class="select-item">
          <span @click="handleSelectItem(option)" class="select-label">
            {{ option }}
          </span>
          <div
            v-if="$slots['item-icon']"
            @click="itemAction(option)"
            class="item-icon"
          >
            <slot name="item-icon"></slot>
          </div>
        </div>
      </div>
    </template>
  </Popper>
</template>

<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import Button from "./Button.vue";

const selectValue = ref("");
const selectRef = ref(null);
const dropdownWidth = ref(0);

const selectLabel = computed(() => selectValue.value || props.placeholder);

onMounted(() => {
  dropdownWidth.value = selectRef.value.$el.clientWidth;
});

const props = defineProps({
  placeholder: { type: String, required: true },
  optionsList: Array,
  handleSelectItem: Function,
  itemAction: Function,
});

const dropdownStyle = computed(() => {
  return {
    minWidth: dropdownWidth.value + "px",
  };
});
</script>

<style lang="scss" scoped>
@import "../assets/root.scss";

.select-dropdown {
  background-color: $secondary;
  border: 1px solid $gray-300;
  border-radius: $padding-1;
  font-size: $font-regular;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  min-width: 10rem;

  .select-item {
    display: flex;
    gap: $padding-4;
    align-items: center;
    justify-content: space-between;
    transition: background-color 0.2s;
    cursor: pointer;
    padding-right: $padding-4;

    &:hover {
      background-color: $gray-200;
    }

    .select-label {
      padding: $padding-2 $padding-4;
      flex: 1;
    }

    .item-icon {
      transition: color 0.2s;
      color: $gray-600;

      &:hover {
        color: $danger;
      }
    }
  }
}
</style>
