import {
  Fermentable,
  Hop,
  HopNote,
  HopSensoryPanel,
  Yeast,
} from "@prisma/client";

export type RangeValue = { min: number; max: number };
export type ExtendedHop = Hop & {
  hopSensoryPanels?: HopSensoryPanel[];
};
export type HopNoteInput = HopNote & {};
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
export type YeastInput = Yeast & {
  tempRange?: RangeValue;
  attenuationRange?: RangeValue;
};
