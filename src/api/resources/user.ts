import type { User } from '@/@types/interfaces/models/user';
import type { SignInFormData } from '@/@types/interfaces/SignInFormData';
import type { CreateUserFormData } from '@/@types/interfaces/CreateUserFormData';
import type { UserFilters } from '@/@types/interfaces/api/UserFilters';
import type { AxiosResponse } from 'axios';
import client from '../client';

type SignInResponse = {
  token: string;
  abilities: Array<string>;
  user: User;
};

export default {
  signIn(data: SignInFormData): Promise<AxiosResponse<SignInResponse>> {
    return client.post('/api/v1/users/sign_in', data, true);
  },
  index(filters?: UserFilters): Promise<AxiosResponse<Array<User>>> {
    return client.get('/api/v1/users', filters);
  },
  create(params: CreateUserFormData) {
    return client.post('/api/v1/users', params, true);
  },
  updatePassword(
    password: string,
    password_confirmation: string,
    token: string
  ) {
    return client.put(
      '/api/v1/users/update_password',
      { password, password_confirmation, token },
      true
    );
  },
  approve(id: number) {
    return client.put(`/api/v1/users/${id}/approve`, null, true);
  },
  disapprove(id: number) {
    return client.put(`/api/v1/users/${id}/disapprove`, null, true);
  },
};
