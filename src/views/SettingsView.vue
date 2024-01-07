<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { usePermissions } from '@/composables/permissions';
import { useSessionStore } from '@/stores/session';
import BackButton from '@/components/buttons/BackButton.vue';
import MenuItem from '@/components/navs/MenuItem.vue';
import ExitIcon from '@/components/icons/ExitIcon.vue';

const { t } = useI18n();
const router = useRouter();
const { userHasPermission } = usePermissions();
const { signOut } = useSessionStore();

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

const logout = () => {
  signOut();
  router.push({ name: 'login' });
};
</script>

<template>
  <div class="settings-view">
    <div class="flex relative justify-center">
      <BackButton class="absolute left-0 w-fit h-fit" />

      <img
        src="@/assets/images/logo.png"
        :alt="t('altLogo')"
        class="w-36 h-30"
      />

      <button
        @click="logout"
        class="absolute bg-danger text-light rounded-md p-1 right-0 w-fit h-fit"
      >
        <ExitIcon class="w-6 h-6" />
      </button>
    </div>

    <ul class="grid gap-4">
      <MenuItem
        v-for="item in navItems"
        @navigate="router.push({ name: item.route })"
        :active="false"
        :show="userHasPermission(item.permission)"
        :key="item.route"
      >
        {{ t(`components.navs.asideNav.items.${item.route}`) }}
      </MenuItem>
    </ul>
  </div>
</template>
