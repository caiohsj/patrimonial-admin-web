<script lang="ts" setup>
import { computed, ref } from 'vue';

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
  (event: 'selectedFiled', value: FileList | string | null | undefined): void;
}>();

const selectFile = () => {
  emit('selectedFiled', inputFile.value?.files);
};

const onClick = (e: Event) => {
  e.preventDefault();
  navigator.camera.getPicture((imageData) => {
    console.log(imageData);
    emit('selectedFiled', imageData);
  }, () => {
    alert('deu ruim');
  }, {
        // Some common settings are 20, 50, and 100
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: false,
        correctOrientation: true,
    });
};
</script>

<template>
  <div class="flex flex-col">
    <label :for="props.name" :class="defaultInputClasses">
      {{ props.label }}
    </label>
    <input
      @change="selectFile"
      @click="onClick"
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
