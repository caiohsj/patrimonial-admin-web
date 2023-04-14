import type { CostCenter } from '@/@types/interfaces/models/CostCenter';
import type { AxiosResponse } from 'axios';
import type { CreateCostCenterFormData } from '@/@types/interfaces/CreateCostCenterFormData';
import client from '../client';

export default {
  index(): Promise<AxiosResponse<Array<CostCenter>>> {
    return client.get('/cost_centers');
  },
  create(params: CreateCostCenterFormData) {
    return client.post('/cost_centers', params, true);
  },
  show(id: number): Promise<AxiosResponse<CostCenter>> {
    return client.get(`/cost_centers/${id}`);
  },
  update(params: CreateCostCenterFormData, id: number) {
    return client.put(`/cost_centers/${id}`, params, true);
  },
  delete(branch: CostCenter) {
    return client.delete(`/cost_centers/${branch.id}`);
  },
};
