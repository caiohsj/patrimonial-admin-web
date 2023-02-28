<script setup lang="ts">
import LoadingScreen from '@/components/feedbacks/LoadingScreen.vue';
</script>

<template>
  <div class="bg-gray-light h-screen">
    <LoadingScreen />
    <RouterView />
  </div>
</template>
