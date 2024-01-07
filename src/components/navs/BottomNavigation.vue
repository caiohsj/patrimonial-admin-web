<script lang="ts" setup>
import type { Component } from 'vue';
import { useRoute } from 'vue-router';
import { usePermissions } from '@/composables/permissions';
import HomeIcon from '@/components/icons/HomeIcon.vue';

type NavItem = {
  route: string;
  permission?: string;
  activeRoutes: string[];
  icon: Component;
};
const navItems: NavItem[] = [
  {
    route: 'home',
    activeRoutes: ['materialPossessions'],
    icon: HomeIcon,
  },
];
const route = useRoute();
const { userHasPermission } = usePermissions();

const showNavbarIcon = (permission?: string) => {
  if (permission == undefined) return true;

  return userHasPermission(permission);
};

const itemActive = (activeRoutes: string[]) => {
  return activeRoutes.includes(String(route.name));
};
</script>

<template>
  <ul
    class="bottom-navigation fixed bottom-0 left-0 right-0 bg-light shadow-lg flex justify-around items-center h-16 md:hidden"
  >
    <li
      v-for="{ route, icon, permission, activeRoutes } in navItems"
      :key="route"
      :class="[
        'item flex rounded-full w-12 h-12',
        {
          'text-light': itemActive(activeRoutes),
          'bg-success': itemActive(activeRoutes),
          'text-gray-darken': !itemActive(activeRoutes),
        },
      ]"
    >
      <router-link
        v-if="showNavbarIcon(permission)"
        :to="{ name: route }"
        class="flex items-center"
      >
        <component :is="icon" class="icon p-2" />
      </router-link>
    </li>
  </ul>
</template>
