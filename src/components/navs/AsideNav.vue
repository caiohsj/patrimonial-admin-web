<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useI18n } from '@/composables/i18n';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSessionStore } from '@/stores/session';
import { useAsideNavStore } from '@/stores/AsideNav';
import { usePermissions } from '@/composables/permissions';
import MenuItem from './MenuItem.vue';

const navMobile = ref<HTMLDivElement>();

const { toggleNavMobile, setNavMobileRef } = useAsideNavStore();

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const sessionStore = useSessionStore();
const { hasSession } = storeToRefs(sessionStore);

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
      'auditOfMaterialPossessions',
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
    route: 'brands',
    permission: 'list-brands',
    activeRoutes: ['brands'],
  },
  {
    route: 'templates',
    permission: 'list-templates',
    activeRoutes: ['templates'],
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

onMounted(() => {
  setNavMobileRef(navMobile.value);
});
</script>

<template>
  <div class="bg-white pt-3 hidden md:block md:w-52 lg:w-80" v-if="hasSession">
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
          v-for="item in navItems"
          @navigate="navigate(item.route)"
          :active="itemActive(item.activeRoutes)"
          :show="userHasPermission(item.permission)"
          :key="item.route"
        >
          {{ t(`components.navs.asideNav.items.${item.route}`) }}
        </MenuItem>
      </ul>
    </nav>
  </div>
</template>
