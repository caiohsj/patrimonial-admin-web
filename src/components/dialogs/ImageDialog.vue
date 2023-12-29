<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps<{
  src: string;
  alt?: string;
  open: boolean;
}>();
const emit = defineEmits(['close']);
const dialog = ref<HTMLDialogElement>();

watch(props, (values) => {
  if (values.open) dialog.value?.showModal();
  else dialog.value?.close();
});
</script>

<template>
  <dialog
    ref="dialog"
    class="image-dialog fixed z-10 w-full h-full m-auto rounded-md"
    :open="props.open"
  >
    <button
      class="fixed right-6 top-6 font-baloo2-extrabold text-2xl z-20"
      @click="emit('close')"
    >
      X
    </button>
    <img class="w-full border-none" v-bind="{ ...props }" />
  </dialog>
</template>
