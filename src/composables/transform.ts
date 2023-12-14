export function useTransform() {
  const objectToArray = (data: any, exceptKeys?: Array<string>): Array<any> => {
    const arr: any[] = [];
    Object.keys(data).forEach((key) => {
      if (
        Object.prototype.hasOwnProperty.call(data, key) &&
        !exceptKeys?.includes(key)
      ) {
        arr.push(data[key]);
      }
    });
    return arr;
  };

  const currencyBRLToNumber = (currencyFormattedValue: string): number => {
    return parseFloat(
      currencyFormattedValue.trim().replace(/[R$.]/g, '').replace(',', '.')
    );
  };

  const numberToCurrencyBRL = (value?: number): string => {
    return `R$ ${value?.toString().replace('.', ',')}`;
  };

  const parseDate = (value?: string): string => {
    if (!value) return '';

    const date = value.split('-');

    return `${date[2]}/${date[1]}/${date[0]}`;
  };

  return { objectToArray, currencyBRLToNumber, numberToCurrencyBRL, parseDate };
}
