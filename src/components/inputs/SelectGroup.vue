<script lang="ts" setup>
import { useField } from 'vee-validate';
import { computed } from 'vue';

const defaultSelectClasses = [
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

type SelectOption = {
  value: string | number;
  text: string;
};

type SelectGroupProps = {
  label: string;
  name: string;
  modelValue?: string;
  rules?: string;
  options: Array<SelectOption>;
};

const props = defineProps<SelectGroupProps>();
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

const errorSelectClass = computed(() =>
  !meta.valid && meta.validated ? 'border-danger' : ''
);
</script>

<template>
  <div class="flex flex-col">
    <label :for="props.name" class="font-baloo2-bold text-dark">
      {{ props.label }}
    </label>
    <select
      :id="props.name"
      :name="props.name"
      v-model="value"
      @change="updateModelValue"
      :class="[...defaultSelectClasses, errorSelectClass]"
    >
      <option
        v-for="{ value, text } in props.options"
        :key="value"
        :value="value"
      >
        {{ text }}
      </option>
    </select>
    <span class="text-danger">{{ errorMessage }}</span>
  </div>
</template>

<style lang="css" scoped>
select {
  border-width: 1px;
}
</style>
