import client from '../client';
import type { AxiosResponse } from 'axios';
import type { Template } from '@/@types/interfaces/models/template';
import type { TemplateFilters } from '@/@types/interfaces/api/TemplateFilters';

export default {
  index(params: TemplateFilters): Promise<AxiosResponse<Array<Template>>> {
    return client.get('/api/v1/templates', params);
  },
};
