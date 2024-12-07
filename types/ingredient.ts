import { Fermentable, Hop, Yeast } from "@prisma/client";

export type RangeValue = { min: number; max: number };

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
export type FermentableInput = Fermentable;
export type YeastInput = Yeast;
