import { defineStore } from 'pinia';
import type { User } from '@/@types/interfaces/models/user';
import type { CreateUserFormData } from '@/@types/interfaces/CreateUserFormData';
import type { UserFilters } from '@/@types/interfaces/api/UserFilters';
import UserResource from '@/api/resources/user';
import { useTransform } from '@/composables/transform';
import { useSessionStore } from './session';

type UserStoreState = {
  users: Array<User>;
  filters: UserFilters;
};

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => ({
    users: [],
    filters: {
      approved: 1,
    },
  }),

  getters: {},

  actions: {
    async fetchUsers() {
      const { data } = await UserResource.index(this.filters);
      this.users = data;
    },

    fetchApprovedUsers() {
      this.filters.approved = 1;
      this.fetchUsers();
    },

    fetchDisapprovedUsers() {
      this.filters.approved = 0;
      this.fetchUsers();
    },

    createUser(params: CreateUserFormData) {
      return UserResource.create(params);
    },

    async approveUser(id: number) {
      await UserResource.approve(id);
      this.fetchApprovedUsers();
    },

    async disapproveUser(id: number) {
      await UserResource.disapprove(id);
      this.fetchDisapprovedUsers();
    },

    createPassword(
      password: string,
      password_confirmation: string,
      token: string
    ) {
      return UserResource.updatePassword(
        password,
        password_confirmation,
        token
      );
    },

    async updateProfile(name: string, email: string, avatar: File | string) {
      const { fileToBase64 } = useTransform();

      const avatarBase64 =
        avatar instanceof File ? await fileToBase64(avatar) : avatar;

      await UserResource.updateProfile(
        name,
        email,
        avatarBase64.replace('data:image/jpeg;base64,', '')
      );

      const { refresh } = useSessionStore();
      refresh();
    },

    async deleteUser(id: number) {
      await UserResource.delete(id);
      this.fetchUsers();
    },
  },
});
