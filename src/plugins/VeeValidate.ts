import { defineRule, configure } from 'vee-validate';
import { required, email, min, max } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import pt_BR from '@vee-validate/i18n/dist/locale/pt_BR.json';

export default {
  install() {
    // Define the rule globally
    defineRule('required', required);
    defineRule('email', email);
    defineRule('min', min);
    defineRule('max', max);

    configure({
      generateMessage: localize({
        pt_BR: {
          ...pt_BR,
        },
      }),
    });

    setLocale('pt_BR');
  },
};
