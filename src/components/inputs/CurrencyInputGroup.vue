<script lang="ts" setup>
import { required } from '@vee-validate/rules';
import { useField } from 'vee-validate';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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
  modelValue?: string;
  required?: boolean;
  currency: string;
};

const props = defineProps<InputGroupProps>();
const emit = defineEmits<{
  (event: 'update:modelValue', value: string | null): void;
}>();

const updateModelValue = () => emit('update:modelValue', value.value);

const { errorMessage, value, meta } = useField<string>(
  props.name,
  (value: string) => {
    if (props.required) {
      return required(value);
    }

    let currencyPattern: RegExp;
    switch (props.currency) {
      case 'BRL':
        currencyPattern = /^R\$ (\d{1,3}(?:\.\d{3})*|\d+)(,\d{2})?$/;
        break;
      default:
        currencyPattern = /^R\$ (\d{1,3}(?:\.\d{3})*|\d+)(,\d{2})?$/;
    }

    return currencyPattern.test(value)
      ? true
      : t('validations.errors.currency', { currency: props.currency });
  },
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
      type="text"
      :name="props.name"
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
