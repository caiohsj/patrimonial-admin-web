import { defineStore } from 'pinia';
import type { Role } from '@/@types/interfaces/models/role';
import RoleResource from '@/api/resources/role';

type RoleStoreState = {
  roles: Array<Place>;
  role: Role | null;
};

export const useRoleStore = defineStore('role', {
  state: (): RoleStoreState => ({
    roles: [],
    place: null,
  }),

  getters: {},

  actions: {
    async fetchRoles() {
      const { data } = await RoleResource.index();
      this.roles = data;
    },
  },
});
