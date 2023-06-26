import { defineStore } from 'pinia';
import type { Role } from '@/@types/interfaces/models/role';
import type { CreateRoleFormData } from '@/@types/interfaces/CreateRoleFormData';
import RoleResource from '@/api/resources/role';

type RoleStoreState = {
  roles: Array<Role>;
};

export const useRoleStore = defineStore('role', {
  state: (): RoleStoreState => ({
    roles: [],
  }),

  getters: {},

  actions: {
    async fetchRoles() {
      const { data } = await RoleResource.index();
      this.roles = data;
    },

    createRole(params: CreateRoleFormData) {
      return RoleResource.create(params);
    },
  },
});
