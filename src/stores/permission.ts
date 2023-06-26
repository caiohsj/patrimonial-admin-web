import { defineStore } from 'pinia';
import type { Permission } from '@/@types/interfaces/models/permission';
import PermissionResource from '@/api/resources/permission';

type PermissionStoreState = {
  permissions: Array<Permission>;
};

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionStoreState => ({
    permissions: [],
  }),

  getters: {
    permissionsOptions: (state) => {
      return state.permissions.map((permission) => ({
        text: String(permission.name),
        value: permission.id,
      }));
    },
  },

  actions: {
    async fetchPermissions() {
      const { data } = await PermissionResource.index();
      this.permissions = data;
    },
  },
});
