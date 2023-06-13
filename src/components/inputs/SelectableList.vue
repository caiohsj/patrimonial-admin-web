<script lang="ts" setup>
import { computed } from 'vue';

type SelectOption = {
  value: string | number;
  text: string;
};

type SelectGroupProps = {
  label?: string;
  modelValue?: string | number;
  options: Array<SelectOption>;
};

const props = defineProps<SelectGroupProps>();
const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number): void;
}>();

const updateModelValue = (value: string | number) => emit('update:modelValue', value);
</script>

<template>
  <div class="flex flex-col">
    <p class="font-baloo2-bold text-dark">
      {{ props.label }}
    </p>
    <ul>
      <li
        v-for="{ value, text } in props.options"
        :key="value"
        @click="updateModelValue(value)"
      >
        {{ text }}
      </li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
</style>
