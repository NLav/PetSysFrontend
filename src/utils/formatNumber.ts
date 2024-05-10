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

export const roundNumber = (value: number, direction: "up" | "down") => {
  if (String(value).includes(".")) {
    const splittedValue = String(value).split(".")[0];

    return direction === "up"
      ? Number(splittedValue) + 1
      : Number(splittedValue);
  } else {
    return value;
  }
};
