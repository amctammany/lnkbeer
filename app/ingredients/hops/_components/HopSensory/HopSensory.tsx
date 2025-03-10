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
  userPanel?: HopSensoryPanel;
  hop?: ExtendedHop | null;
};
const aromaGroups: Uncapitalize<AromaGroups>[] = [
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
];

function addUserChartData(root: HopSensoryChartData, src: HopSensoryPanel) {
  return aromaGroups.reduce((acc, g) => {
    acc[g].user = src[g] ?? 0;
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
    acc[g] = { value: res[g] / (src?.hopSensoryPanels?.length ?? 1) };
    return acc;
  }, {} as HopSensoryChartData);
}

export function HopSensory({ hop, userPanel }: HopSensoryProps) {
  const data = makeAvgChartData(hop!);
  const d = addUserChartData(data, userPanel ?? ({} as HopSensoryPanel));

  return (
    <div className="grid grid-cols-1">
      <HopSensoryChart data={d} src={hop} />
    </div>
  );
}

export default HopSensory;
