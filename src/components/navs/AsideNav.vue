<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const { t } = useI18n();
const route = useRoute();

const navItems = [
  {
    route: 'branches',
  },
  {
    route: 'places',
  },
];

const navItemActiveClass = (name: string) => {
  const activeClasses = [
    'bg-primary',
    'text-white',
    'hover:bg-transparent',
    'hover:text-primary',
    'hover:border-primary',
  ];
  return name == route.name ? activeClasses : '';
};
</script>

<template>
  <div class="bg-white w-80 pt-3">
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
            :class="[
              'flex',
              'justify-center',
              'rounded-sm',
              'py-2',
              'border-2',
              'border-transparent',
              'cursor-pointer',
              'hover:bg-primary',
              'hover:text-white',
              'transition',
              navItemActiveClass(item.route),
            ]"
            :to="item.route"
          >
            {{ t(`components.navs.asideNav.items.${item.route}`) }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
