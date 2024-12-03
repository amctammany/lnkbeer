import { RangeValue } from "@/components/Form/RangeSlider";
import { Hop } from "@prisma/client";

export type HopInput = Hop & {
  alphaRange?: RangeValue;
  betaRange?: RangeValue;
  cohumuloneRange?: RangeValue;
  caryophylleneRange?: RangeValue;
  farneseneRange?: RangeValue;
  humuleneRange?: RangeValue;
  myrceneRange?: RangeValue;
  totalOilRange?: RangeValue;
};
