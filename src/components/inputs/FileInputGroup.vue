<script lang="ts" setup>
import { ref } from 'vue';

const inputFile = ref<HTMLInputElement>();

const defaultInputClasses = [
  'h-16',
  'rounded-md',
  'shadow-lg',
  'cursor-pointer',
  'p-2',
  'transition-all',
  'duration-300',
  'bg-success',
  'text-white',
  'text-lg',
  'font-baloo2-bold',
  'flex',
  'justify-center',
  'items-center',
  'border-success',
  'border-2',
  'hover:bg-white',
  'hover:text-success',
];

type FileInputGroupProps = {
  label: string;
  name: string;
  multiple?: boolean;
  capture?: 'user' | 'environment';
  accept?: string;
};

const props = defineProps<FileInputGroupProps>();
const emit = defineEmits<{
  (event: 'selectedFiled', value: FileList | null | undefined): void;
}>();

const selectFile = () => {
  emit('selectedFiled', inputFile.value?.files);
};
</script>

<template>
  <div class="flex flex-col">
    <label :for="props.name" :class="defaultInputClasses">
      {{ props.label }}
    </label>
    <input
      @change="selectFile"
      :id="props.name"
      :accept="props.accept"
      :capture="props.capture"
      :multiple="props.multiple"
      ref="inputFile"
      type="file"
      class="hidden"
    />
  </div>
</template>

<style scoped>
input {
  border-width: 1px;
}
</style>
