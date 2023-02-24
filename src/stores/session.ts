import type { SignInFormData } from '@/@types/interfaces/SignInFormData';
import { defineStore } from 'pinia';
import UserResource from '@/api/resources/user';
import type { User } from '@/@types/interfaces/models/user';

type SessionStoreState = {
  currentUser: User | null;
  token: string | null;
  abilities: Array<string>;
};

export const useSessionStore = defineStore('session', {
  state: (): SessionStoreState => ({
    currentUser: null,
    token: null,
    abilities: [],
  }),
  getters: {
    hasSession: (state) => state.currentUser != null && state.token != null,
  },
  actions: {
    async signIn(payload: SignInFormData) {
      const { data } = await UserResource.signIn(payload);
      this.$patch({
        currentUser: data.user,
        token: data.token,
        abilities: data.abilities,
      });
    },
  },
  persist: true,
});
