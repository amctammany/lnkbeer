import {
  AromaGroups,
  Fermentable,
  Hop,
  HopNote,
  HopSensoryPanel,
  Yeast,
} from "@prisma/client";

export type RangeValue = { min: number; max: number }; //| [number, number];
//export type RangeValue = [number, number];
export type ExtendedHop = Hop & {
  hopSensoryPanels?: HopSensoryPanel[];
};
export type ExtendedHopNote = HopNote & any;
export type HopNoteInput = Partial<HopNote> & {};
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
export type FermentableInput = Partial<Fermentable> & {
  name: string | null;
  slug: string | null;
};
export type YeastInput = Yeast & {
  tempRange?: RangeValue;
  attenuationRange?: RangeValue;
};
export type HopSensoryData = {
  value?: number;
  expert?: number;
  user?: number;
  avg?: number;
};

export type HopSensoryChartData<T = HopSensoryData> = Record<
  Uncapitalize<AromaGroups>,
  T
>;
