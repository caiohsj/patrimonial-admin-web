import type { CostCenter } from '@/@types/interfaces/models/CostCenter';
import type { AxiosResponse } from 'axios';
import type { CreateCostCenterFormData } from '@/@types/interfaces/CreateCostCenterFormData';
import client from '../client';

export default {
  index(): Promise<AxiosResponse<Array<CostCenter>>> {
    return client.get('/api/v1/cost_centers');
  },
  create(params: CreateCostCenterFormData) {
    return client.post('/api/v1/cost_centers', params, true);
  },
  show(id: number): Promise<AxiosResponse<CostCenter>> {
    return client.get(`/api/v1/cost_centers/${id}`);
  },
  update(params: CreateCostCenterFormData, id: number) {
    return client.put(`/api/v1/cost_centers/${id}`, params, true);
  },
  delete(branch: CostCenter) {
    return client.delete(`/api/v1/cost_centers/${branch.id}`);
  },
};
