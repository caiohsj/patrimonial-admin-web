<script setup lang="ts">
import LoadingScreen from '@/components/feedbacks/LoadingScreen.vue';
import AppHeader from '@/components/headers/AppHeader.vue';
</script>

<template>
  <div class="bg-gray-light flex h-screen">
    <LoadingScreen />
    <div class="flex flex-col w-full">
      <AppHeader />
      <RouterView class="overflow-auto" />
    </div>
  </div>
</template>
