import { useI18n as vueUseI18n } from 'vue-i18n';
import type ptBR from '../locales/pt-BR.json';

export const useI18n = () =>
  vueUseI18n<{
    locale: 'pt-BR';
    messages: {
      'pt-BR': typeof ptBR;
    };
  }>();
