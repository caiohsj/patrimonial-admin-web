import client from '../client';
import type { AxiosResponse } from 'axios';
import type { MaterialPossession } from '@/@types/interfaces/models/MaterialPossession';

export default {
  index(): Promise<AxiosResponse<Array<MaterialPossession>>> {
    return client.get('/material_possessions');
  },
  create(params: FormData) {
    return client.post('/material_possessions', params, true);
  },
};
