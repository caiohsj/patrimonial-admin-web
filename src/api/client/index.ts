import { useSessionStore } from '@/stores/session';
import { useLoadingStore } from '@/stores/loading';
import axios, { type AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000, // 1 minute
});

instance.interceptors.request.use((config) => {
  const loadingStore = useLoadingStore();
  loadingStore.startLoading();

  const sessionStore = useSessionStore();
  config.headers.Authorization = `Bearer ${sessionStore.token}`;

  return config;
});

const client = {
  get(endpoint: string, params?: any) {
    const loadingStore = useLoadingStore();

    return new Promise<AxiosResponse<any, any>>((resolve, reject) => {
      instance
        .get(endpoint, { params })
        .then((response) => resolve(response))
        .catch((error) => reject(error))
        .finally(() => loadingStore.stopLoading());
    });
  },

  post(endpoint: string, data: any, showFeedback = false) {
    const loadingStore = useLoadingStore();

    return new Promise<AxiosResponse<any, any>>((resolve, reject) => {
      instance
        .post(endpoint, data)
        .then((response) => {
          if (showFeedback) loadingStore.setSuccess();
          resolve(response);
        })
        .catch((error) => {
          if (showFeedback) loadingStore.setError(error);
          reject(error);
        })
        .finally(() => loadingStore.stopLoading(showFeedback));
    });
  },

  put(endpoint: string, data: any, showFeedback = false) {
    const loadingStore = useLoadingStore();

    return new Promise<AxiosResponse<any, any>>((resolve, reject) => {
      instance
        .put(endpoint, data)
        .then((response) => {
          if (showFeedback) loadingStore.setSuccess();
          resolve(response);
        })
        .catch((error) => {
          if (showFeedback) loadingStore.setError(error);
          reject(error);
        })
        .finally(() => loadingStore.stopLoading(showFeedback));
    });
  },

  delete(endpoint: string, showFeedback = false) {
    const loadingStore = useLoadingStore();

    return new Promise<AxiosResponse<any, any>>((resolve, reject) => {
      instance
        .delete(endpoint)
        .then((response) => {
          if (showFeedback) loadingStore.setSuccess();
          resolve(response);
        })
        .catch((error) => {
          if (showFeedback) loadingStore.setError(error);
          reject(error);
        })
        .finally(() => loadingStore.stopLoading(showFeedback));
    });
  },
};

export default client;
