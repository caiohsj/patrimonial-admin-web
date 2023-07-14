import { defineStore } from 'pinia';
import type { User } from '@/@types/interfaces/models/user';
import type { CreateUserFormData } from '@/@types/interfaces/CreateUserFormData';
import UserResource from '@/api/resources/user';

type UserStoreState = {
  users: Array<User>;
};

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => ({
    users: [],
  }),

  getters: {},

  actions: {
    async fetchUsers() {
      const { data } = await UserResource.index();
      this.users = data;
    },

    createUser(params: CreateUserFormData) {
      return UserResource.create(params);
    },
  },
});
