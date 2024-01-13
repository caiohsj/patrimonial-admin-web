import ptBR from '@/locales/pt-BR.json';
import { createI18n, type I18nOptions } from 'vue-i18n';

const messages = {
  'pt-BR': ptBR,
};

const i18nOptions: I18nOptions = {
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  messages,
  allowComposition: true,
};

const i18n = createI18n(i18nOptions);

export default i18n;
