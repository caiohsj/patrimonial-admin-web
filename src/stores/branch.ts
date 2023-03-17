import { defineStore } from 'pinia';
import type { Branch } from '@/@types/interfaces/models/branch';
import type { CreateBranchFormData } from '@/@types/interfaces/CreateBranchFormData';
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
      return state.branches.map((branch, index) => ({
        text: branch.description,
        value: index,
      }));
    },
  },

  actions: {
    async fetchBranches() {
      const { data } = await BranchResource.index();
      this.branches = data;
    },

    createBranch(params: CreateBranchFormData) {
      return BranchResource.create(params);
    },
  },
});
