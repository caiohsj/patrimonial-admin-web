import client from '../client';
import type { AxiosResponse } from 'axios';
import type { MaterialPossession } from '@/@types/interfaces/models/MaterialPossession';
import type { MaterialPossessionFilters } from '@/@types/interfaces/api/MaterialPossessionFilters';

export default {
  index(
    params: MaterialPossessionFilters
  ): Promise<AxiosResponse<Array<MaterialPossession>>> {
    return client.get('/material_possessions', params);
  },
  create(params: FormData) {
    return client.post('/material_possessions', params, true);
  },
  bulkCreate(params: FormData) {
    return client.post('/material_possessions/bulk_create', params, true);
  },
  delete(materialPossession: MaterialPossession) {
    return client.delete(`/material_possessions/${materialPossession.id}`);
  },
  approve(id: number) {
    return client.put(`/material_possessions/${id}/approve`, null, true);
  },
};
