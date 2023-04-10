import type { Place } from '@/@types/interfaces/models/place';
import type { FetchPlaceParams } from '@/@types/interfaces/FetchPlaceParams';
import type { CreatePlaceFormData } from '@/@types/interfaces/CreatePlaceFormData';
import type { AxiosResponse } from 'axios';
import client from '../client';

export default {
  index(params?: FetchPlaceParams): Promise<AxiosResponse<Array<Place>>> {
    return client.get('/places', params);
  },
  create(params: CreatePlaceFormData) {
    return client.post('/places', params, true);
  },
  show(id: number): Promise<AxiosResponse<Place>> {
    return client.get(`/places/${id}`);
  },
  update(params: CreatePlaceFormData, id: number) {
    return client.put(`/places/${id}`, params, true);
  },
  delete(branch: Place) {
    return client.delete(`/places/${branch.id}`);
  },
};
