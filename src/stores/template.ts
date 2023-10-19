import { defineStore } from 'pinia';
import type { Template } from '@/@types/interfaces/models/template';
import type { TemplateFilters } from '@/@types/interfaces/api/TemplateFilters';
import TemplateResource from '@/api/resources/template';

type TemplateStoreState = {
  templates: Array<Template>;
  filters: TemplateFilters;
};

export const useTemplateStore = defineStore('template', {
  state: (): TemplateStoreState => ({
    templates: [],
    filters: {
      name: '',
    },
  }),

  actions: {
    async fetchTemplates() {
      const { data } = await TemplateResource.index(this.filters);
      this.templates = data;
    },

    clearTemplates() {
      this.templates = [];
    },
  },
});
