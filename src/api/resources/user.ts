import type { User } from '@/@types/interfaces/models/user';
import type { SignInFormData } from '@/@types/interfaces/SignInFormData';
import type { AxiosResponse } from 'axios';
import client from '../client';

type SignInResponse = {
  token: string;
  abilities: Array<string>;
  user: User;
};

export default {
  signIn(data: SignInFormData): Promise<AxiosResponse<SignInResponse>> {
    return client.post('/users/sign_in', data);
  },
};
