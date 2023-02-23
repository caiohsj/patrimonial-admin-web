<script lang="ts" setup>
import { ref, watch } from 'vue';

type InputGroupProps = {
  label: string;
  type: 'email' | 'text' | 'date' | 'number' | 'password' | 'search';
  modelValue?: string;
  autocomplete?: 'on' | 'off';
};

const props = defineProps<InputGroupProps>();
const emit = defineEmits<{
  (event: 'update:modelValue', value: string | null): void;
}>();

const inputValue = ref(null);

watch(inputValue, (value) => emit('update:modelValue', value));

const inputId = `${props.label.toLowerCase()}_${Math.floor(Math.random() * 6)}`;
</script>

<template>
  <div class="flex flex-col">
    <label :for="inputId" class="font-baloo2-bold text-dark">
      {{ props.label }}
    </label>
    <input
      :id="inputId"
      :type="props.type"
      :autocomplete="props.autocomplete"
      v-model="inputValue"
      class="bg-light border-dark h-16 rounded-md shadow-lg outline-none p-2 transition-all duration-300 focus:border-sky-300"
    />
  </div>
</template>

<style scoped>
input {
  border-width: 1px;
}
</style>
