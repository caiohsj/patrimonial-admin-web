<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSessionStore } from '@/stores/session';
import { useAsideNavStore } from '@/stores/AsideNav';
import { usePermissions } from '@/composables/permissions';
import { useWindow } from '@/composables/window';
import CloseIcon from '@/components/icons/CloseIcon.vue';
import MenuItem from './MenuItem.vue';
import SafeImage from '@/components/common/SafeImage.vue';

const navMobile = ref<HTMLDivElement>();

const { toggleNavMobile, setNavMobileRef } = useAsideNavStore();

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
    route: 'materialPossessions',
    permission: 'list-material-possessions',
    activeRoutes: [
      'materialPossessions',
      'createMaterialPossessions',
      'bulkCreateMaterialPossessions',
      'editMaterialPossessions',
      'showMaterialPossessions',
    ],
  },
  {
    route: 'branches',
    permission: 'list-branches',
    activeRoutes: ['branches', 'editBranches', 'createBranches'],
  },
  {
    route: 'places',
    permission: 'list-places',
    activeRoutes: ['places', 'editPlaces', 'createPlaces'],
  },
  {
    route: 'accounts',
    permission: 'list-accounts',
    activeRoutes: ['accounts', 'editAccounts', 'createAccounts'],
  },
  {
    route: 'roles',
    permission: 'list-roles',
    activeRoutes: ['roles', 'createRoles'],
  },
  {
    route: 'users',
    permission: 'list-users',
    activeRoutes: ['users', 'createUsers'],
  },
  {
    route: 'costCenters',
    permission: 'list-cost-centers',
    activeRoutes: ['costCenters', 'editCostCenters', 'createCostCenters'],
  },
];

const itemActive = (activeRoutes: string[]) => {
  return activeRoutes.includes(String(route.name));
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

onMounted(() => {
  setNavMobileRef(navMobile.value);
});
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
          :active="itemActive(item.activeRoutes)"
          :show="userHasPermission(item.permission)"
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
    <div
      class="bg-white pt-3 w-0 opacity-0 fixed inset-0 z-10 transition-all duration-700 px-8 overflow-auto"
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
          <SafeImage
            :src="currentUser?.avatar"
            :alt="t('components.headers.appHeader.avatarAlt')"
            class="h-12 shadow-lg rounded-full border-white border-4"
            placeholder="/images/Avatar.jpg"
          />
        </div>
        <div class="font-baloo2-bold flex flex-col text-center w-full">
          <span class="text-lg text-light">{{ currentUser?.name }}</span>
          <span class="text-xs text-gray-light text-center">
            {{ currentUser?.role.name }}
          </span>
          <a
            @click="navigate('userProfile')"
            class="cursor-pointer mt-8 py-1 text-light rounded-bl-lg rounded-br-lg"
          >
            {{ t('components.headers.appHeader.profile') }}
          </a>
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
            :active="itemActive(item.activeRoutes)"
            :show="userHasPermission(item.permission)"
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
