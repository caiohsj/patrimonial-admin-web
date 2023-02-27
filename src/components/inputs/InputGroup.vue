<script lang="ts" setup>
import { useField } from 'vee-validate';
import { computed } from 'vue';

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

const { errorMessage, value, meta } = useField<string>(
  props.name,
  props.rules,
  {
    label: props.label.toLocaleLowerCase(),
  }
);

const errorInputClass = computed(() =>
  !meta.valid && meta.validated ? 'border-danger' : ''
);
</script>

<template>
  <div class="flex flex-col">
    <label :for="props.name" class="font-baloo2-bold text-dark">
      {{ props.label }}
    </label>
    <input
      :id="props.name"
      :type="props.type"
      :name="props.name"
      :autocomplete="props.autocomplete"
      v-model="value"
      @input="updateModelValue"
      :class="[...defaultInputClasses, errorInputClass]"
    />
    <span class="text-danger">{{ errorMessage }}</span>
  </div>
</template>

<style scoped>
input {
  border-width: 1px;
}
</style>
