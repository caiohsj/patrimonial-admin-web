export function useTransform() {
  const objectToArray = (data: any): Array<any> => {
    const arr: any[] = [];
    Object.keys(data).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(data, key)) arr.push(data[key]);
    });
    return arr;
  };

  return { objectToArray };
};
