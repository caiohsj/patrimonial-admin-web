import client from '../client';
import type { AxiosResponse } from 'axios';
import type { MaterialPossession } from '@/@types/interfaces/models/MaterialPossession';
import type { MaterialPossessionFilters } from '@/@types/interfaces/api/MaterialPossessionFilters';

export default {
  index(
    params: MaterialPossessionFilters
  ): Promise<AxiosResponse<Array<MaterialPossession>>> {
    return client.get('/api/v1/material_possessions', params);
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
  delete(materialPossession: MaterialPossession) {
    return client.delete(
      `/api/v1/material_possessions/${materialPossession.id}`
    );
  },
  approve(id: number) {
    return client.put(`/api/v1/material_possessions/${id}/approve`, null, true);
  },
};
