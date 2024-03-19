export const convertInputDateToDate = (inputDate: string) => {
  const [year, month, day] = inputDate.split("-");

  return new Date(Number(year), Number(month) - 1, Number(day));
};
