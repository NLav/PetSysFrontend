export const normalizeString = (value: string): string => {
  return value
    .toLowerCase()
    .trim()
    .replaceAll(" ", "")
    .normalize("NFD")
    .replaceAll(/\p{Diacritic}/gu, "");
};
