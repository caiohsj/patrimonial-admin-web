import { defineStore } from 'pinia';
import type { Branch } from '@/@types/interfaces/models/branch';
import type { CreateBranchFormData } from '@/@types/interfaces/CreateBranchFormData';
import BranchResource from '@/api/resources/branch';

type BranchStoreState = {
  branches: Array<Branch>;
  branch: Branch | null;
};

export const useBranchStore = defineStore('branch', {
  state: (): BranchStoreState => ({
    branches: [],
    branch: null,
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

    async fetchBranch(id: number) {
      const { data } = await BranchResource.show(id);
      this.branch = data;
    },

    updateBranch(params: CreateBranchFormData, id: number) {
      return BranchResource.update(params, id);
    },

    deleteBranch(branch: Branch) {
      BranchResource.delete(branch);
      this.fetchBranches();
    },
  },
});
