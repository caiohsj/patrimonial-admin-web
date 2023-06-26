import type { Permission } from '@/@types/interfaces/models/permission';
import type { AxiosResponse } from 'axios';
import client from '../client';

export default {
  index(): Promise<AxiosResponse<Array<Permission>>> {
    return client.get('/permissions');
  },
};
