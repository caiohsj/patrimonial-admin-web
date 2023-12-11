import client from '../client';
import type { AxiosResponse } from 'axios';
import type { MaterialPossession } from '@/@types/interfaces/models/MaterialPossession';
import type { MaterialPossessionFilters } from '@/@types/interfaces/api/MaterialPossessionFilters';
import type { UpdateMaterialPossessionFormData } from '@/@types/interfaces/UpdateMaterialPossessionFormData';
import type { Show } from '@/@types/interfaces/api/MaterialPossessions/Show';

export default {
  index(
    params: MaterialPossessionFilters
  ): Promise<AxiosResponse<Array<MaterialPossession>>> {
    return client.get('/api/v1/material_possessions', params);
  },
  show(id: number): Promise<AxiosResponse<Show>> {
    return client.get(`/api/v1/material_possessions/${id}`);
  },
  create(params: FormData) {
    return client.post('/api/v1/material_possessions', params, true);
  },
  bulkCreate(params: FormData) {
    return client.post(
      '/api/v1/material_possessions/bulk_create',
      params,
      true
    );
  },
  update(id: number, params: UpdateMaterialPossessionFormData) {
    return client.put(`/api/v1/material_possessions/${id}`, params, true);
  },
  delete(materialPossession: MaterialPossession) {
    return client.delete(
      `/api/v1/material_possessions/${materialPossession.id}`
    );
  },
  approve(id: number) {
    return client.put(`/api/v1/material_possessions/${id}/approve`, null, true);
  },
};
