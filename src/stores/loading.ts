import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import i18n from '@/locales';

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
      this.error = true;
      switch (axiosError.response?.status) {
        case 401:
          this.errorMessages.push(i18n.global.t('errors.unauthorized'));
          break;
        case 422:
          this.errorMessages.push(...axiosError.response.data.errors);
          break;
        default:
          this.errorMessages.push(i18n.global.t('errors.responseInvalid'));
          break;
      }
    },

    setSuccess() {
      this.success = true;
    },
  },
});
