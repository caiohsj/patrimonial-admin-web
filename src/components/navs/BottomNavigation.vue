<script lang="ts" setup>
import { computed, type Component } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from '@/composables/i18n';
import { storeToRefs } from 'pinia';
import { usePermissions } from '@/composables/permissions';
import { useSessionStore } from '@/stores/session';
import HomeIcon from '@/components/icons/HomeIcon.vue';
import SettingsIcon from '@/components/icons/SettingsIcon.vue';
import SafeImage from '../common/SafeImage.vue';

const route = useRoute();
const { t } = useI18n();
const { userHasPermission } = usePermissions();
const { currentUser, hasSession, hasApplicationConfigurations } = storeToRefs(
  useSessionStore()
);

type NavItem = {
  route: string;
  permission?: string;
  activeRoutes: string[];
  icon: Component;
  iconProps?: any;
  cssClasses?: string[] | string;
};
const navItems: NavItem[] = [
  {
    route: 'settings',
    activeRoutes: ['settings'],
    icon: SettingsIcon,
  },
  {
    route: 'home',
    activeRoutes: ['materialPossessions'],
    icon: HomeIcon,
  },
  {
    route: 'userProfile',
    activeRoutes: ['userProfile'],
    icon: SafeImage,
    iconProps: {
      src: currentUser.value?.avatar,
      alt: t('components.bottomNavigation.userAvatarAlt'),
      placeholder: '/images/Avatar.jpg',
      class: 'rounded-full',
    },
  },
];

const showNavbarIcon = (permission?: string) => {
  if (permission == undefined) return true;

  return userHasPermission(permission);
};

const itemActive = (activeRoutes: string[]) => {
  return activeRoutes.includes(String(route.name));
};

const showBottomNavigation = computed(
  () =>
    hasSession ||
    (userHasPermission('application-configurations') &&
      hasApplicationConfigurations)
);
</script>

<template>
  <ul
    :class="[
      'bottom-navigation',
      'fixed bottom-0 left-0 right-0 bg-light shadow-lg justify-around items-center h-16 md:hidden',
      {
        flex: showBottomNavigation.value,
        hidden: !showBottomNavigation.value,
      },
    ]"
  >
    <li
      v-for="{ route, icon, permission, activeRoutes, iconProps } in navItems"
      :key="route"
      :class="[
        'item flex rounded-full',
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
        <component
          :is="icon"
          class="w-10 h-10 p-1 object-cover"
          v-bind="{ ...iconProps }"
        />
      </router-link>
    </li>
  </ul>
</template>
