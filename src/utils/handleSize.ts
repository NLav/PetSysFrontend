import { roundNumber } from "./formatNumber";

export const getNumberOfColumns = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  childWidth: number
) => {
  return roundNumber((ref.current?.clientWidth || 0) / childWidth, "down");
};
