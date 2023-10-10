import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import i18n from '@/locales';
import { useTransform } from '@/composables/transform';

type LoadingStoreState = {
  loading: boolean;
  error: boolean;
  success: boolean;
  errorMessages: Array<string>;
};

export const useLoadingStore = defineStore('loading', {
  state: (): LoadingStoreState => ({
    loading: false,
    error: false,
    success: false,
    errorMessages: [],
  }),
  actions: {
    startLoading() {
      this.loading = true;
    },

    stopLoading(showFeedback = false) {
      const timeout = showFeedback ? 2000 : 0;
      setTimeout(() => {
        this.success = false;
        this.error = false;
        this.loading = false;
        this.errorMessages = [];
      }, timeout);
    },

    setError(axiosError: AxiosError<any, any>) {
      const { objectToArray } = useTransform();
      this.error = true;
      switch (axiosError.response?.status) {
        case 401:
          this.errorMessages.push(i18n.global.t('errors.unauthorized'));
          break;
        case 404:
          this.errorMessages.push(i18n.global.t('errors.notFound'));
          break;
        case 422:
          if (typeof axiosError.response.data.errors == 'object') {
            const errors = objectToArray(
              axiosError.response.data.errors
            ).flat();
            this.errorMessages.push(...errors);
          } else {
            this.errorMessages.push(...axiosError.response.data.errors);
          }
          break;
        case 500:
          this.errorMessages.push(i18n.global.t('errors.responseInvalid'));
          break;
        default:
          break;
      }
    },

    setSuccess() {
      this.success = true;
    },
  },
});
