import type { Role } from '@/@types/interfaces/models/role';
import type { AxiosResponse } from 'axios';
import client from '../client';

export default {
  index(): Promise<AxiosResponse<Array<Role>>> {
    return client.get('/roles');
  },
};
