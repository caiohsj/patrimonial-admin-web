import { defineStore } from 'pinia';
import type { CostCenter } from '@/@types/interfaces/models/CostCenter';
import type { CreateCostCenterFormData } from '@/@types/interfaces/CreateCostCenterFormData';
import CostCenterResource from '@/api/resources/CostCenter';

type CostCenterStoreState = {
  costCenters: Array<CostCenter>;
  costCenter: CostCenter | null;
};

export const useCostCenterStore = defineStore('cost_center', {
  state: (): CostCenterStoreState => ({
    costCenters: [],
    costCenter: null,
  }),

  getters: {
    costCentersOptions: (state) => {
      return state.costCenters.map((costCenter) => ({
        text: costCenter.description,
        value: costCenter.id,
      }));
    },
  },

  actions: {
    async fetchCostCenters() {
      const { data } = await CostCenterResource.index();
      this.costCenters = data;
    },

    createCostCenter(params: CreateCostCenterFormData) {
      return CostCenterResource.create(params);
    },

    async fetchCostCenter(id: number) {
      const { data } = await CostCenterResource.show(id);
      this.costCenter = data;
    },

    updateCostCenter(params: CreateCostCenterFormData, id: number) {
      return CostCenterResource.update(params, id);
    },

    async deleteCostCenter(costCenter: CostCenter) {
      await CostCenterResource.delete(costCenter);
      this.fetchCostCenters();
    },
  },
});
