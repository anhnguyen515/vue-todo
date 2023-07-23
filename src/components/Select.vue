<template>
  <Popper offsetDistance="4" :show="openPopper">
    <Button
      color="secondary"
      ref="selectRef"
      @click="openPopper = !openPopper"
      :style="dropdownStyle"
    >
      {{ selectLabel }}
      <template #end-icon>
        <i v-if="!openPopper" class="bi bi-chevron-down"></i>
        <i v-else class="bi bi-chevron-up"></i>
      </template>
    </Button>
    <template #content>
      <div class="select-dropdown" :style="dropdownStyle">
        <div
          v-for="option in optionsList"
          class="select-item"
          :class="{ selected: selectValue === option }"
        >
          <span
            @click="
              () => {
                if (selectValue === option) {
                  handleSelectItem('');
                  selectValue = '';
                } else {
                  handleSelectItem(option);
                  selectValue = option;
                }
                openPopper = false;
              }
            "
            class="select-label"
          >
            {{ option }}
          </span>
          <div
            v-if="$slots['end-icon']"
            @click="itemAction(option)"
            class="end-icon"
          >
            <slot name="end-icon"></slot>
          </div>
        </div>
      </div>
    </template>
  </Popper>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import Button from "./Button.vue";

const selectValue = ref("");
const selectRef = ref(null);
const dropdownWidth = ref(0);
const openPopper = ref(false);

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

  .select-item {
    display: flex;
    align-items: center;
    transition: background-color 0.2s;
    cursor: pointer;
    padding-right: $padding-4;

    &:hover {
      background-color: $gray-200;
    }

    &.selected {
      background-color: $gray-200;
      color: $primary;
    }

    .select-label {
      padding: $padding-2 $padding-4;
      flex: 1;
    }

    .start-icon {
      padding-left: $padding-4;
    }

    .end-icon {
      transition: color 0.2s;
      color: $gray-600;
      margin-left: auto;

      &:hover {
        color: $danger;
      }
    }
  }
}
</style>
