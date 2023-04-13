import type { Account } from '@/@types/interfaces/models/account';
import type { CreateAccountFormData } from '@/@types/interfaces/CreateAccountFormData';
import type { AxiosResponse } from 'axios';
import client from '../client';

export default {
  index(): Promise<AxiosResponse<Array<Account>>> {
    return client.get('/accounts');
  },
  create(params: CreateAccountFormData) {
    return client.post('/accounts', params, true);
  },
  show(id: number): Promise<AxiosResponse<Account>> {
    return client.get(`/accounts/${id}`);
  },
  update(params: CreateAccountFormData, id: number) {
    return client.put(`/accounts/${id}`, params, true);
  },
  delete(branch: Account) {
    return client.delete(`/accounts/${branch.id}`);
  },
};
