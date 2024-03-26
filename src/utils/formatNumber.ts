export const normalizeNumber = (value: string, digitsQuantity: number) => {
  const array = [];

  for (let i = 1; i <= digitsQuantity; i++) {
    array.push(0);
  }

  const normalizedValue = array.join("0") + value;

  return normalizedValue.slice(
    normalizedValue.length - digitsQuantity,
    normalizedValue.length
  );
};
