import { defineRule, configure } from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import pt_BR from '@vee-validate/i18n/dist/locale/pt_BR.json';

// Define the rule globally
defineRule('required', required);
defineRule('email', email);

configure({
  generateMessage: localize({
    pt_BR,
  }),
});

setLocale('pt_BR');
