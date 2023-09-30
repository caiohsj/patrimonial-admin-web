<script setup lang="ts">
import LoadingScreen from '@/components/feedbacks/LoadingScreen.vue';
import AppHeader from '@/components/headers/AppHeader.vue';
import AsideNav from '@/components/navs/AsideNav.vue';
</script>

<template>
  <div class="bg-gray-light flex h-screen">
    <LoadingScreen />
    <AsideNav />
    <div class="pt-20 flex flex-col w-full md:pt-0 overflow-auto">
      <AppHeader class="md:px-8" />
      <main class="flex-1">
        <RouterView class="px-2 sm:px-8" />
      </main>
    </div>
  </div>
</template>
