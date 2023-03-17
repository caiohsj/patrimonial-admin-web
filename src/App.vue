<script setup lang="ts">
import LoadingScreen from '@/components/feedbacks/LoadingScreen.vue';
import AppHeader from '@/components/headers/AppHeader.vue';
import AsideNav from '@/components/navs/AsideNav.vue';
</script>

<template>
  <div class="bg-gray-light flex h-screen">
    <LoadingScreen />
    <AsideNav />
    <div class="flex flex-col w-full">
      <AppHeader class="px-8" />
      <main class="overflow-y-auto flex-1">
        <RouterView class="px-8" />
      </main>
    </div>
  </div>
</template>
