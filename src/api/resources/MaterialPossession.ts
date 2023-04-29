import client from '../client';

export default {
  create(params: FormData) {
    return client.post('/material_possessions', params, true);
  },
};
