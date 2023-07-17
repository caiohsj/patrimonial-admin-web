import type { User } from '@/@types/interfaces/models/user';
import type { SignInFormData } from '@/@types/interfaces/SignInFormData';
import type { CreateUserFormData } from '@/@types/interfaces/CreateUserFormData';
import type { AxiosResponse } from 'axios';
import client from '../client';

type SignInResponse = {
  token: string;
  abilities: Array<string>;
  user: User;
};

export default {
  signIn(data: SignInFormData): Promise<AxiosResponse<SignInResponse>> {
    return client.post('/users/sign_in', data, true);
  },
  index(): Promise<AxiosResponse<Array<User>>> {
    return client.get('/users');
  },
  create(params: CreateUserFormData) {
    return client.post('/users', params, true);
  },
  updatePassword(
    password: string,
    password_confirmation: string,
    token: string
  ) {
    return client.put(
      '/users/update_password',
      { password, password_confirmation, token },
      true
    );
  },
};
