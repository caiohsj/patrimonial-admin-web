import type { Place } from '@/@types/interfaces/models/place';
import type { CreatePlaceFormData } from '@/@types/interfaces/CreatePlaceFormData';
import type { AxiosResponse } from 'axios';
import client from '../client';

export default {
  index(): Promise<AxiosResponse<Array<Place>>> {
    return client.get('/places');
  },
  create(params: CreatePlaceFormData) {
    return client.post('/places', params, true);
  },
};
