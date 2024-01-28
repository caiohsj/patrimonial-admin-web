import { defineStore } from 'pinia';
import type { MaterialPossessionFilters } from '@/@types/interfaces/api/MaterialPossessionFilters';
import type { Show } from '@/@types/interfaces/api/MaterialPossessions/Show';
import MaterialPossessionResource from '@/api/resources/MaterialPossession';
import type { Index } from '@/@types/interfaces/api/MaterialPossessions/Index';

type MaterialPossessionStoreState = {
  materialPossessions: Array<Index>;
  materialPossession: Show | null;
  filters: MaterialPossessionFilters;
};

export const useMaterialPossessionStore = defineStore('material_possession', {
  state: (): MaterialPossessionStoreState => ({
    materialPossession: null,
    materialPossessions: [],
    filters: {
      approved: 1,
    },
  }),

  actions: {
    async fetchMaterialPossessions() {
      const { data } = await MaterialPossessionResource.index(this.filters);
      this.materialPossessions = data;
    },

    createMaterialPossession(
      number: string,
      description: string,
      placeId: number,
      images: Array<File | string>,
      brandName: string,
      templateName: string,
      dateOfAquisition: string,
      aquisitionValue: number,
      costCenterId: number | null,
      accountId: number | null,
      residualValueOfDiscard: number,
      lifespan: number | null
    ) {
      const formData = new FormData();
      formData.append('number', number);
      formData.append('description', description);
      formData.append('place_id', String(placeId));

      if (brandName != undefined)
        formData.append('brand_name', String(brandName));

      if (templateName != undefined)
        formData.append('template_name', String(templateName));

      formData.append('date_of_aquisition', dateOfAquisition);
      formData.append('aquisition_value', String(aquisitionValue));
      formData.append(
        'residual_value_of_discard',
        String(residualValueOfDiscard)
      );

      if (lifespan != undefined) formData.append('lifespan', String(lifespan));

      if (costCenterId != null)
        formData.append('cost_center_id', String(costCenterId));

      if (accountId != null) formData.append('account_id', String(accountId));

      for (let image of images) {
        if (typeof image == 'string') {
          image = image.replace('data:image/jpeg;base64,', '');
        }

        formData.append('images[]', image);
      }
      return MaterialPossessionResource.create(formData);
    },

    bulkCreateMaterialPossession(
      description: string,
      number_prefix: string,
      to: number,
      from: number,
      placeId: number,
      images: Array<File | string>
    ) {
      const formData = new FormData();

      formData.append('description', description);
      formData.append('number_prefix', number_prefix);
      formData.append('to', String(to));
      formData.append('from', String(from));
      formData.append('place_id', String(placeId));

      for (let image of images) {
        if (typeof image == 'string') {
          image = image.replace('data:image/jpeg;base64,', '');
        }

        formData.append('images[]', image);
      }
      return MaterialPossessionResource.bulkCreate(formData);
    },

    updateMaterialPossession(
      materialPossessionId: number,
      description: string,
      brandName: string,
      templateName: string,
      dateOfAquisition: string,
      aquisitionValue: number,
      costCenterId: number,
      accountId: number,
      residualValueOfDiscard: number,
      lifespan: number
    ) {
      return MaterialPossessionResource.update(materialPossessionId, {
        description,
        brand_name: brandName,
        template_name: templateName,
        date_of_aquisition: dateOfAquisition,
        aquisition_value: String(aquisitionValue),
        cost_center_id: costCenterId,
        account_id: accountId,
        residual_value_of_discard: String(residualValueOfDiscard),
        lifespan,
      });
    },

    async deleteMaterialPossession(id: number) {
      await MaterialPossessionResource.delete(id);
      this.fetchMaterialPossessions();
    },

    async fetchMaterialPossession(id: number) {
      const { data } = await MaterialPossessionResource.show(id);
      this.materialPossession = data;
    },

    fetchApprovedMaterialPossessions() {
      this.filters.approved = 1;
      this.fetchMaterialPossessions();
    },

    fetchDisapprovedMaterialPossessions() {
      this.filters.approved = 0;
      this.fetchMaterialPossessions();
    },

    async approveMaterialPossession(id: number) {
      await MaterialPossessionResource.approve(id);
      this.fetchMaterialPossessions();
    },
  },
});
