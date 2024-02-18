import client from '../client';
import type { AxiosResponse } from 'axios';
import type { IndexFilters } from '@/@types/interfaces/api/MaterialPossessions/IndexFilters';
import type { UpdateMaterialPossessionFormData } from '@/@types/interfaces/UpdateMaterialPossessionFormData';
import type { Show } from '@/@types/interfaces/api/MaterialPossessions/Show';
import type { Index } from '@/@types/interfaces/api/MaterialPossessions/Index';
import type { Log } from '@/@types/interfaces/api/MaterialPossessions/log';

export default {
  index(params: IndexFilters): Promise<AxiosResponse<Array<Index>>> {
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
  delete(id: number) {
    return client.delete(`/api/v1/material_possessions/${id}`);
  },
  approve(id: number) {
    return client.put(`/api/v1/material_possessions/${id}/approve`, null, true);
  },
  logs(): Promise<AxiosResponse<Array<Log>>> {
    return client.get('/api/v1/logs/material_possessions');
  },
  export(): Promise<AxiosResponse<Blob>> {
    return client.blob('/api/v1/material_possessions_export');
  },
};
