import { defineStore } from 'pinia';
import type { Brand } from '@/@types/interfaces/models/brand';
import type { BrandFilters } from '@/@types/interfaces/api/BrandFilters';
import BrandResource from '@/api/resources/brand';

type BrandStoreState = {
  brands: Array<Brand>;
  filters: BrandFilters;
};

export const useBrandStore = defineStore('brand', {
  state: (): BrandStoreState => ({
    brands: [],
    filters: {
      name: '',
    },
  }),

  actions: {
    async fetchBrands() {
      const { data } = await BrandResource.index(this.filters);
      this.brands = data;
    },

    clearBrands() {
      this.brands = [];
    },
  },
});
