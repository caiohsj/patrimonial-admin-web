import { useField } from 'vee-validate';
import { props } from './CurrencyInputGroup.vue';

export const { errorMessage, value, meta } = useField<string>(props.name, (value: string) => {
if (!value && props.required) {
return 'is required';
}

let currencyPattern: RegExp;
switch (props.currency) {
case 'BRL':
currencyPattern = /^R\$ (\d{1,3}(?:\.\d{3})*|\d+)(,\d{2})?$/;
break;
default:
currencyPattern = /^R\$ (\d{1,3}(?:\.\d{3})*|\d+)(,\d{2})?$/;
}

return currencyPattern.test(value);
}, {
label: props.label.toLocaleLowerCase(),
});
