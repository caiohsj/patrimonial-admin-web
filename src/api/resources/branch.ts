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
};
