import type { Role } from '@/@types/interfaces/models/role';
import type { CreateRoleFormData } from '@/@types/interfaces/CreateRoleFormData';
import type { AxiosResponse } from 'axios';
import client from '../client';

export default {
  index(): Promise<AxiosResponse<Array<Role>>> {
    return client.get('/api/v1/roles');
  },
  create(params: CreateRoleFormData) {
    return client.post('/api/v1/roles', params, true);
  },
};
