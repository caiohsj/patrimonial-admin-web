import client from '../client';
import type { AxiosResponse } from 'axios';
import type { Brand } from '@/@types/interfaces/models/brand';
import type { BrandFilters } from '@/@types/interfaces/api/BrandFilters';

export default {
  index(params: BrandFilters): Promise<AxiosResponse<Array<Brand>>> {
    return client.get('/api/v1/brands', params);
  },
};
