<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, type RouteLocationRaw } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSessionStore } from '@/stores/session';
import { usePermissions } from '@/composables/permissions';
import { useWindow } from '@/composables/window';
import HamburgerIcon from '@/components/icons/HamburgerIcon.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';

const navMobile = ref<HTMLDivElement>();

const { bodyWidth } = useWindow();
const showButtonNavMobile = computed(() => bodyWidth.value < 768);

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

const toggleNavMobile = () => {
  navMobile.value?.classList.toggle('w-0');
  navMobile.value?.classList.toggle('opacity-0');
  navMobile.value?.classList.toggle('w-full');
};

const navigate = (name: string): RouteLocationRaw => {
  toggleNavMobile();

  return { name };
};
</script>

<template>
  <div
    class="bg-white pt-3 hidden md:block md:w-52 lg:w-80"
    v-if="hasSession && !showButtonNavMobile"
  >
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
            :to="navigate(item.route)"
          >
            {{ t(`components.navs.asideNav.items.${item.route}`) }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
  <div v-else>
    <button
      class="absolute z-10 top-5 left-3 w-12 h-12"
      @click="toggleNavMobile"
    >
      <HamburgerIcon class="w-full h-full text-gray-darken active:text-light" />
    </button>
    <div
      class="bg-white pt-3 w-0 opacity-0 fixed inset-0 z-10 transition-all duration-700"
      ref="navMobile"
    >
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
              :to="navigate(item.route)"
            >
              {{ t(`components.navs.asideNav.items.${item.route}`) }}
            </router-link>
          </li>
        </ul>
      </nav>
      <button class="absolute top-3 right-3" @click="toggleNavMobile">
        <CloseIcon class="w-12 h-12 rounded-full p-2 active:opacity-40" />
      </button>
    </div>
  </div>
</template>
