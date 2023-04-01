<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSessionStore } from '@/stores/session';
import { usePermissions } from '@/composables/permissions';
import { useWindow } from '@/composables/window';
import HamburgerIcon from '@/components/icons/HamburgerIcon.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';
import MenuItem from './MenuItem.vue';

const navMobile = ref<HTMLDivElement>();

const { bodyWidth } = useWindow();
const isMobile = computed(() => bodyWidth.value < 768);

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const sessionStore = useSessionStore();
const { hasSession, currentUser } = storeToRefs(sessionStore);

const { userHasPermission } = usePermissions();

const navItems = [
  {
    route: 'branches',
  },
  {
    route: 'places',
  },
];

const itemActive = (name: string) => {
  return name == route.name;
};

const toggleNavMobile = () => {
  navMobile.value?.classList.toggle('w-0');
  navMobile.value?.classList.toggle('opacity-0');
  navMobile.value?.classList.toggle('w-full');
};

const navigate = (name: string): void => {
  toggleNavMobile();

  router.push({ name });
};

const logout = () => {
  toggleNavMobile();
  sessionStore.signOut();
  router.push({ name: 'login' });
};
</script>

<template>
  <div
    class="bg-white pt-3 hidden md:block md:w-52 lg:w-80"
    v-if="hasSession && !isMobile"
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
        <MenuItem
          :active="itemActive(item.route)"
          :show="userHasPermission(item.route)"
          :key="item.route"
          v-for="item in navItems"
          @navigate="navigate(item.route)"
        >
          {{ t(`components.navs.asideNav.items.${item.route}`) }}
        </MenuItem>
      </ul>
    </nav>
  </div>
  <div v-if="hasSession && isMobile">
    <button
      class="absolute z-10 top-5 left-2 w-12 h-12"
      @click="toggleNavMobile"
    >
      <HamburgerIcon class="w-full h-full text-gray-darken active:text-light" />
    </button>
    <div
      class="bg-white pt-3 w-0 opacity-0 fixed inset-0 z-10 transition-all duration-700 px-8"
      ref="navMobile"
    >
      <div class="flex justify-center mb-10">
        <img
          src="@/assets/images/logo.png"
          :alt="t('altLogo')"
          class="w-36 h-30"
        />
      </div>
      <div class="flex relative bg-gray-darken pt-8 mb-6 rounded-lg">
        <div class="absolute flex justify-center -top-6 w-full">
          <img
            src="@/assets/images/Avatar.jpg"
            :alt="currentUser?.name"
            class="h-12 shadow-lg rounded-full border-white border-4"
          />
        </div>
        <div class="font-baloo2-bold flex flex-col text-center w-full">
          <span class="text-lg text-light">{{ currentUser?.name }}</span>
          <span class="text-xs text-gray-light text-center">
            {{ currentUser?.role.name }}
          </span>
          <a
            @click="logout"
            class="bg-danger cursor-pointer mt-8 py-1 text-light rounded-bl-lg rounded-br-lg"
          >
            {{ t('components.headers.appHeader.logout') }}
          </a>
        </div>
      </div>
      <nav>
        <ul class="grid gap-4">
          <MenuItem
            :active="itemActive(item.route)"
            :show="userHasPermission(item.route)"
            :key="item.route"
            v-for="item in navItems"
            @navigate="navigate(item.route)"
          >
            {{ t(`components.navs.asideNav.items.${item.route}`) }}
          </MenuItem>
        </ul>
      </nav>
      <button class="absolute top-3 right-3" @click="toggleNavMobile">
        <CloseIcon class="w-12 h-12 rounded-full p-2 active:opacity-40" />
      </button>
    </div>
  </div>
</template>
