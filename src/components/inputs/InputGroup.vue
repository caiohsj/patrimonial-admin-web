<script lang="ts" setup>
import { useField } from 'vee-validate';
import { computed } from 'vue';
import { vMaska } from 'maska';
import type { MaskInputOptions } from 'maska';

const defaultInputClasses = [
  'bg-light',
  'border-dark',
  'h-12',
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
  disabled?: boolean;
  modelValue?: string;
  type: 'email' | 'text' | 'date' | 'number' | 'password' | 'search';
  autocomplete?: 'on' | 'off';
  rules?: string;
  mask?: string | Array<string> | Function;
  maskOptions?: MaskInputOptions;
};

const props = defineProps<InputGroupProps>();
const emit = defineEmits<{
  (event: 'update:modelValue', value: string | null): void;
}>();

const updateModelValue = (e: Event) => {
  if (e.target instanceof HTMLInputElement) {
    value.value = e.target.value;
    emit('update:modelValue', value.value);
  }
};

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

const disabledLabelClasses = computed(() =>
  props.disabled ? 'opacity-20' : ''
);
</script>

<template>
  <div class="flex flex-col">
    <label
      :for="props.name"
      :class="['font-baloo2-bold', 'text-dark', disabledLabelClasses]"
    >
      {{ props.label }}
    </label>
    <input
      :id="props.name"
      :type="props.type"
      :name="props.name"
      :autocomplete="props.autocomplete"
      :disabled="props.disabled"
      :value="value"
      v-maska:[props.maskOptions]
      :data-maska="props.mask"
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

input[disabled] {
  opacity: 0.2;
}
</style>
