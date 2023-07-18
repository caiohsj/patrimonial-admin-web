import { defineStore } from 'pinia';
import type { CreateMaterialPossessionFormData } from '@/@types/interfaces/CreateMaterialPossessionFormData';
import type { MaterialPossession } from '@/@types/interfaces/models/MaterialPossession';
import type { BulkCreateMaterialPossessionFormData } from '@/@types/interfaces/BulkCreateMaterialPossessionFormData';
import type { MaterialPossessionFilters } from '@/@types/interfaces/api/MaterialPossessionFilters';
import MaterialPossessionResource from '@/api/resources/MaterialPossession';

type MaterialPossessionStoreState = {
  materialPossessions: Array<MaterialPossession>;
  filters: MaterialPossessionFilters;
};

export const useMaterialPossessionStore = defineStore('material_possession', {
  state: (): MaterialPossessionStoreState => ({
    materialPossessions: [],
    filters: {
      approved: 0,
    },
  }),

  actions: {
    async fetchMaterialPossessions() {
      const { data } = await MaterialPossessionResource.index(this.filters);
      this.materialPossessions = data;
    },

    createMaterialPossession(
      params: CreateMaterialPossessionFormData,
      images: Array<File>
    ) {
      const formData = new FormData();
      for (const [key, value] of Object.entries(params)) {
        formData.append(key, value);
      }
      for (const image of images) {
        formData.append('images[]', image);
      }
      return MaterialPossessionResource.create(formData);
    },

    bulkCreateMaterialPossession(
      params: BulkCreateMaterialPossessionFormData,
      images: Array<File>
    ) {
      const formData = new FormData();
      for (const [key, value] of Object.entries(params)) {
        formData.append(key, value);
      }
      for (const image of images) {
        formData.append('images[]', image);
      }
      return MaterialPossessionResource.bulkCreate(formData);
    },

    async deleteMaterialPossession(materialPossession: MaterialPossession) {
      await MaterialPossessionResource.delete(materialPossession);
      this.fetchMaterialPossessions();
    },

    fetchApprovedMaterialPossessions() {
      this.filters.approved = 1;
      this.fetchMaterialPossessions();
    },

    fetchDisapprovedMaterialPossessions() {
      this.filters.approved = 0;
      this.fetchMaterialPossessions();
    },
  },
});
