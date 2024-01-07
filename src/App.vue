<script setup lang="ts">
import LoadingScreen from '@/components/feedbacks/LoadingScreen.vue';
import AppHeader from '@/components/headers/AppHeader.vue';
import AsideNav from '@/components/navs/AsideNav.vue';
import BottomNavigation from '@/components/navs/BottomNavigation.vue';
</script>

<template>
  <div class="bg-gray-light flex h-screen">
    <LoadingScreen />
    <AsideNav />
    <div class="pt-0 relative flex flex-col w-full overflow-auto">
      <AppHeader class="py-8 md:px-8" />
      <main class="flex-1">
        <RouterView class="pt-6 px-8 pb-20 md:pb-6" />
      </main>
      <BottomNavigation />
    </div>
  </div>
</template>
