import { format } from "date-fns";

export const getInputDateMinMax = {
  min: "2000-01-01",
  max: format(new Date(), "yyyy-MM-dd"),
};
