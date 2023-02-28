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

    setCurrentBranch(index: number) {
      const branchStore = useBranchStore();
      this.currentBranch = branchStore.branches[index];
    },

    setCurrentPlace(index: number) {
      const placeStore = usePlaceStore();
      this.currentPlace = placeStore.places[index];
    },
  },
  persist: true,
});
