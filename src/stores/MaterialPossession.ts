import { defineStore } from 'pinia';
import type { CreateMaterialPossessionFormData } from '@/@types/interfaces/CreateMaterialPossessionFormData';
import MaterialPossessionResource from '@/api/resources/MaterialPossession';

export const useMaterialPossessionStore = defineStore('material_possession', {
  actions: {
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
      MaterialPossessionResource.create(formData);
    },
  },
});
