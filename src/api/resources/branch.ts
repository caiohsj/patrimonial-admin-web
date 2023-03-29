import type { Branch } from '@/@types/interfaces/models/branch';
import type { AxiosResponse } from 'axios';
import type { CreateBranchFormData } from '@/@types/interfaces/CreateBranchFormData';
import client from '../client';

export default {
  index(): Promise<AxiosResponse<Array<Branch>>> {
    return client.get('/branches');
  },
  create(params: CreateBranchFormData) {
    return client.post('/branches', params, true);
  },
  show(id: number): Promise<AxiosResponse<Branch>> {
    return client.get(`/branches/${id}`);
  },
  update(params: CreateBranchFormData, id: number) {
    return client.put(`/branches/${id}`, params, true);
  },
  delete(branch: Branch) {
    return client.delete(`/branches/${branch.id}`);
  },
};
