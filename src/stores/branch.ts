import { defineStore } from 'pinia';
import type { Branch } from '@/@types/interfaces/models/branch';
import BranchResource from '@/api/resources/branch';

type BranchStoreState = {
  branches: Array<Branch>;
};

export const useBranchStore = defineStore('branch', {
  state: (): BranchStoreState => ({
    branches: [],
  }),

  getters: {
    branchesOptions: (state) => {
      return state.branches.map((branch) => ({
        text: branch.description,
        value: branch.id,
      }));
    },
  },

  actions: {
    async fetchBranches() {
      const { data } = await BranchResource.index();
      this.branches = data;
    },
  },
});
