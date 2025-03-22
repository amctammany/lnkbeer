"use client";
import type { AromaGroups, HopSensoryPanel } from "@prisma/client";
//import { HopSensoryChart } from "../HopSensoryChart";
import dynamic from "next/dynamic";
import { ExtendedHop, HopSensoryChartData } from "@/types/ingredient";
const HopSensoryChart = dynamic(
  () => import("../HopSensoryChart/HopSensoryChart"),
  { ssr: false },
);

export type HopSensoryProps = {
  //slug: string;
  userPanels: HopSensoryPanel[];
  expertPanels: HopSensoryPanel[];
  hop?: ExtendedHop | null;
};
export const aromaGroups: Uncapitalize<AromaGroups>[] = [
  "sweetAromatic",
  "pomme",
  "citrus",
  "melon",
  "earthy",
  "tropical",
  "berry",
  "stoneFruit",
  "dank",
  "herbal",
  "floral",
  "grassy",
  "vegetal",
  "woody",
  "spicy",
  "onionGarlic",
  "offFlavors",
];
function addMultipleToChartData(
  root: HopSensoryChartData,
  src: HopSensoryPanel[],
  key: string,
) {
  return aromaGroups.reduce((acc, g) => {
    acc[g][key] =
      src.reduce((sAcc, s) => {
        return sAcc + s[g];
      }, 0) / src.length;
    return acc;
  }, root);
}

function addToChartData(
  root: HopSensoryChartData,
  src: HopSensoryPanel,
  key: string,
) {
  return aromaGroups.reduce((acc, g) => {
    acc[g][key] = src[g] ?? 0;
    return acc;
  }, root);
}

//type ChartData = Record<Uncapitalize<AromaGroups>, D>;
function makeAvgChartData(src: ExtendedHop) {
  const res = (src?.hopSensoryPanels ?? []).reduce((acc, panel) => {
    return aromaGroups.reduce((acc2, group) => {
      acc2[group] = (acc2[group] ?? 0) + panel[group];
      return acc2;
    }, acc);
  }, {} as HopSensoryChartData<number>);
  return aromaGroups.reduce((acc, g) => {
    acc[g] = { avg: res[g] / (src?.hopSensoryPanels?.length ?? 1) };
    return acc;
  }, {} as HopSensoryChartData);
}

export function HopSensory({ hop, userPanels, expertPanels }: HopSensoryProps) {
  const data = makeAvgChartData(hop!);
  if (userPanels.length > 0) addMultipleToChartData(data, userPanels, "user");
  if (expertPanels.length > 0)
    addMultipleToChartData(data, expertPanels, "expert");

  return (
    <div className="grid grid-cols-1">
      <HopSensoryChart data={data} src={hop} />
    </div>
  );
}

export default HopSensory;
