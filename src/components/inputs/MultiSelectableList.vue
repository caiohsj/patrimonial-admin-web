<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useField } from 'vee-validate';

type SelectOption = {
  value: number;
  text: string;
};

type MultiSelectableListProps = {
  label?: string;
  name: string;
  modelValue?: Array<number>;
  options: Array<SelectOption>;
  rules?: string;
};

const defaulItemClasses = [
  'cursor-pointer',
  'rounded-md',
  'border-b-2',
  'border-gray-light',
  'p-2',
  'whitespace-nowrap',
  'overflow-hidden',
  'text-ellipsis',
  'hover:shadow-md',
  'hover:whitespace-normal',
  'hover:overflow-auto',
];
const itemsSelected = ref<Array<number>>([]);
const props = defineProps<MultiSelectableListProps>();
const emit = defineEmits<{
  (event: 'update:modelValue', value: Array<number>): void;
}>();

const updateModelValue = (value: number) => {
  const index = itemsSelected.value.indexOf(value);

  switch (itemsSelected.value.includes(value)) {
    case true:
      itemsSelected.value.splice(index, 1);
      break;
    default:
      itemsSelected.value = [...itemsSelected.value, value];
      break;
  }
  setValue(itemsSelected.value);
  emit('update:modelValue', itemsSelected.value);
};

const { errorMessage, meta, setValue } = useField<Array<number>>(
  props.name,
  props.rules,
  {
    label: props.label?.toLocaleLowerCase(),
  }
);

const errorItemClass = computed(() =>
  !meta.valid && meta.validated ? 'border-danger' : ''
);

const itemSelectedClasses = (value: number) => {
  return itemsSelected.value.includes(value)
    ? ['bg-success', 'text-white']
    : [];
};
</script>

<template>
  <div class="flex flex-col">
    <p class="font-baloo2-bold text-dark" v-if="props.label">
      {{ props.label }}
    </p>
    <span class="text-danger">{{ errorMessage }}</span>
    <ul class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      <li
        v-for="{ value, text } in props.options"
        :class="[
          ...defaulItemClasses,
          ...itemSelectedClasses(value),
          errorItemClass,
        ]"
        :key="value"
        @click="updateModelValue(value)"
      >
        {{ text }}
      </li>
    </ul>
  </div>
</template>

<style lang="css" scoped></style>
