import { useSessionStore } from '@/stores/session';
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
});

instance.interceptors.request.use((config) => {
  const sessionStore = useSessionStore();
  config.headers.Authorization = `Bearer ${sessionStore.token}`;

  return config;
});

const client = {
  get(endpoint: string, params?: any) {
    return instance.get(endpoint, { params });
  },

  post(endpoint: string, data: any) {
    return instance.post(endpoint, data);
  },

  put(endpoint: string, data: any) {
    return instance.put(endpoint, data);
  },

  delete(endpoint: string) {
    return instance.delete(endpoint);
  },
};

export default client;
