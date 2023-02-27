import type { Branch } from '@/@types/interfaces/models/branch';
import type { AxiosResponse } from 'axios';
import client from '../client';

export default {
  index(): Promise<AxiosResponse<Array<Branch>>> {
    return client.get('/branches');
  },
};
