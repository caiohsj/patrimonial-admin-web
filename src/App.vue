<script setup lang="ts">
import LoadingScreen from '@/components/feedbacks/LoadingScreen.vue';
import AppHeader from '@/components/headers/AppHeader.vue';
import AsideNav from '@/components/navs/AsideNav.vue';
</script>

<template>
  <div class="bg-gray-light flex h-screen">
    <LoadingScreen />
    <AsideNav />
    <div class="pt-0 flex flex-col w-full overflow-auto">
      <AppHeader class="py-8 md:px-8" />
      <main class="flex-1 px-8 py-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
