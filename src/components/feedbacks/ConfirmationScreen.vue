<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

type ConfirmationScreenProps = {
  modelValue?: boolean;
  title: string;
};

const props = defineProps<ConfirmationScreenProps>();
const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
  (event: 'confirm'): void;
}>();

const { t } = useI18n();
</script>

<template>
  <Teleport to="body">
    <dialog
      v-if="props.modelValue"
      class="fixed inset-0 z-50 bg-dark-transparent flex justify-center items-center w-full h-full"
    >
      <div class="flex flex-col bg-light px-4 py-2 rounded-lg gap-4">
        <h1>{{ props.title }}</h1>
        <div class="flex justify-between gap-2">
          <button
            class="bg-success text-light py-2 px-2 rounded-md w-full"
            @click="emit('confirm')"
          >
            {{ t('components.feedbacks.confirmationScreen.confirm') }}
          </button>
          <button
            class="bg-gray-light text-gray-darken py-2 px-2 rounded-md w-full"
            @click="emit('update:modelValue', false)"
          >
            {{ t('components.feedbacks.confirmationScreen.cancel') }}
          </button>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>
