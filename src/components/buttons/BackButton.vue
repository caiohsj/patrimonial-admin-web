<script lang="ts" setup>
import { useRouter } from 'vue-router';
import BackIcon from '@/components/icons/BackIcon.vue';

const router = useRouter();
</script>
<template>
  <button
    class="bg-gray-darken text-light p-2 rounded-md"
    @click="router.back()"
  >
    <BackIcon class="w-4 h-4" />
  </button>
</template>
