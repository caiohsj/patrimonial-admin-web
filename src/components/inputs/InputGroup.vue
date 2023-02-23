<script lang="ts" setup>
import { useField } from 'vee-validate';
import { toRef, computed } from 'vue';

const defaultInputClasses = [
  'bg-light',
  'border-dark',
  'h-16',
  'rounded-md',
  'shadow-lg',
  'outline-none',
  'p-2',
  'transition-all',
  'duration-300',
  'focus:border-sky-300',
];

type InputGroupProps = {
  label: string;
  name: string;
  modelValue?: string;
  type: 'email' | 'text' | 'date' | 'number' | 'password' | 'search';
  autocomplete?: 'on' | 'off';
  rules?: string;
};

const props = defineProps<InputGroupProps>();
const emit = defineEmits<{
  (event: 'update:modelValue', value: string | null): void;
}>();

const updateModelValue = () => emit('update:modelValue', value.value);

const inputId = `${props.label.toLowerCase()}_${Math.floor(Math.random() * 6)}`;

const nameRef = toRef(props, 'name');
const { errorMessage, value, meta } = useField<string>(nameRef, props.rules);

const errorInputClass = computed(() => (meta.valid ? '' : 'border-red-500'));
</script>

<template>
  <div class="flex flex-col">
    <label :for="inputId" class="font-baloo2-bold text-dark">
      {{ props.label }}
    </label>
    <input
      :id="inputId"
      :type="props.type"
      :name="props.name"
      :autocomplete="props.autocomplete"
      v-model="value"
      @input="updateModelValue"
      :class="[...defaultInputClasses, errorInputClass]"
    />
    <span class="text-red-500">{{ errorMessage }}</span>
  </div>
</template>

<style scoped>
input {
  border-width: 1px;
}
</style>
