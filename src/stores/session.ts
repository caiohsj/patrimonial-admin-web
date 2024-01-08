import type { SignInFormData } from '@/@types/interfaces/SignInFormData';
import { defineStore } from 'pinia';
import UserResource from '@/api/resources/user';
import { useBranchStore } from './branch';
import { usePlaceStore } from './place';
import type { User } from '@/@types/interfaces/models/user';
import type { Branch } from '@/@types/interfaces/models/branch';
import type { Place } from '@/@types/interfaces/models/place';

type SessionStoreState = {
  currentUser: User | null;
  currentBranch: Branch | null;
  currentPlace: Place | null;
  token: string | null;
  abilities: Array<string>;
};

export const useSessionStore = defineStore('session', {
  state: (): SessionStoreState => ({
    currentUser: null,
    currentBranch: null,
    currentPlace: null,
    token: null,
    abilities: [],
  }),
  getters: {
    hasSession: (state) => state.currentUser != null && state.token != null,
    hasApplicationConfigurations: (state) =>
      state.currentBranch != null && state.currentPlace != null,
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

    async refresh() {
      const { data } = await UserResource.refresh();

      this.currentUser = data;
    },

    signOut() {
      this.$patch({
        currentUser: null,
        token: null,
        abilities: [],
        currentBranch: null,
        currentPlace: null,
      });
    },

    clearApplicationConfigurations() {
      this.$patch({
        currentBranch: null,
        currentPlace: null,
      });
    },

    async setCurrentBranch(id: number) {
      const branchStore = useBranchStore();
      await branchStore.fetchBranch(id);
      this.currentBranch = branchStore.branch;
    },

    async setCurrentPlace(id: number) {
      const placeStore = usePlaceStore();
      await placeStore.fetchPlace(id);
      this.currentPlace = placeStore.place;
    },
  },
  persist: true,
});
