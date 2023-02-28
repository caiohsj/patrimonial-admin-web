<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useLoadingStore } from '@/stores/loading';
import CircleLoadingIcon from '@/components/icons/CircleLoadingIcon.vue';
import SuccessIcon from '@/components/icons/SuccessIcon.vue';
import ErrorIcon from '@/components/icons/ErrorIcon.vue';

const { loading, error, success, errorMessages } = storeToRefs(
  useLoadingStore()
);
</script>

<template>
  <div
    v-if="loading"
    class="fixed inset-0 z-50 bg-dark-transparent flex justify-center items-center"
  >
    <div
      v-if="error"
      class="flex flex-col items-center py-4 px-4 w-80 h-fit bg-light rounded-xl"
    >
      <ErrorIcon />
      <div class="bg-danger px-4 py-1 rounded-md mt-4 text-light">
        <p v-for="(message, index) in errorMessages" :key="index">
          {{ message }}
        </p>
      </div>
    </div>
    <div v-if="success">
      <SuccessIcon />
    </div>
    <CircleLoadingIcon
      class="text-primary animate-spin"
      v-if="!error && !success"
    />
  </div>
</template>
