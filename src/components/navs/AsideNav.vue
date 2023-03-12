<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSessionStore } from '@/stores/session';
import { usePermissions } from '@/composables/permissions';

const { t } = useI18n();
const route = useRoute();

const sessionStore = useSessionStore();
const { hasSession } = storeToRefs(sessionStore);

const { userCanAccessRoute } = usePermissions();

const navItems = [
  {
    route: 'branches',
  },
  // {
  //   route: 'places',
  // },
];

const navItemActiveClass = (name: string) => {
  const activeClasses = [
    'bg-primary',
    'text-white',
    'hover:bg-transparent',
    'hover:text-primary',
    'hover:border-primary',
  ];
  return name == route.name
    ? activeClasses
    : ['hover:bg-primary', 'hover:text-white'];
};
</script>

<template>
  <div class="bg-white w-80 pt-3" v-if="hasSession">
    <div class="flex justify-center mb-10">
      <img
        src="@/assets/images/logo.png"
        :alt="t('altLogo')"
        class="w-36 h-30"
      />
    </div>
    <nav class="px-8">
      <ul class="grid gap-4">
        <li v-for="item in navItems" :key="item.route">
          <router-link
            v-if="userCanAccessRoute(item.route)"
            :class="[
              ...navItemActiveClass(item.route),
              'flex',
              'justify-center',
              'font-baloo2-bold',
              'rounded-sm',
              'py-2',
              'border-2',
              'border-transparent',
              'cursor-pointer',
              'transition',
            ]"
            :to="{ name: item.route }"
          >
            {{ t(`components.navs.asideNav.items.${item.route}`) }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
