<script lang="ts" setup>
import { useWebView } from '@/composables/webview';
import { ref } from 'vue';

type FileInputGroupProps = {
  label: string;
  name: string;
  multiple?: boolean;
  capture?: 'user' | 'environment';
  accept?: string;
  size: 'small' | 'large';
};

const { isWebView } = useWebView();
const inputFile = ref<HTMLInputElement>();
const props = defineProps<FileInputGroupProps>();
const emit = defineEmits<{
  (event: 'selectedFiled', value: FileList | string | null | undefined): void;
}>();

const defaultLabelClasses = [
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
  { 'h-10': props.size == 'small' },
  { 'h-16': props.size == 'large' },
];

const selectFile = () => {
  emit('selectedFiled', inputFile.value?.files);
};

const onClick = (e: Event) => {
  if (!isWebView()) return;

  e.preventDefault();
  // @ts-ignore
  navigator.camera.getPicture(
    (imageData: string) => {
      emit('selectedFiled', `data:image/jpeg;base64,${imageData}`);
    },
    (err: any) => {
      console.log(err);
    },
    {
      quality: 100,
      /* eslint-disable */
      // @ts-ignore
      destinationType: Camera.DestinationType.DATA_URL,
      // @ts-ignore
      sourceType: Camera.PictureSourceType.CAMERA,
      // @ts-ignore
      encodingType: Camera.EncodingType.JPEG,
      // @ts-ignore
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: false,
      correctOrientation: true,
      /* eslint-enable */
    }
  );
};
</script>

<template>
  <div class="file-input-group flex flex-col">
    <label :for="props.name" :class="defaultLabelClasses">
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
