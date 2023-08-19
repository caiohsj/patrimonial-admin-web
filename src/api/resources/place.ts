import type { Place } from '@/@types/interfaces/models/place';
import type { FetchPlaceParams } from '@/@types/interfaces/FetchPlaceParams';
import type { CreatePlaceFormData } from '@/@types/interfaces/CreatePlaceFormData';
import type { AxiosResponse } from 'axios';
import client from '../client';

export default {
  index(params?: FetchPlaceParams): Promise<AxiosResponse<Array<Place>>> {
    return client.get('/api/v1/places', params);
  },
  create(params: CreatePlaceFormData) {
    return client.post('/api/v1/places', params, true);
  },
  show(id: number): Promise<AxiosResponse<Place>> {
    return client.get(`/api/v1/places/${id}`);
  },
  update(params: CreatePlaceFormData, id: number) {
    return client.put(`/api/v1/places/${id}`, params, true);
  },
  delete(branch: Place) {
    return client.delete(`/api/v1/places/${branch.id}`);
  },
};
