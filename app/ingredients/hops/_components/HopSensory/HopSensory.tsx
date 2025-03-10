"use client";
import type { AromaGroups, Hop, HopSensoryPanel } from "@prisma/client";
import { Prop } from "@/components/Prop";
import { Card } from "@/components/ui/card";
//import { HopSensoryChart } from "../HopSensoryChart";
import dynamic from "next/dynamic";
import { ExtendedHop, HopSensoryChartData } from "@/types/ingredient";
const HopSensoryChart = dynamic(
  () => import("../HopSensoryChart/HopSensoryChart"),
  { ssr: false },
);

export type HopSensoryProps = {
  //slug: string;
  hop?: ExtendedHop | null;
};

function makeAvgChartData(src: ExtendedHop) {
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

  const res = (src?.hopSensoryPanels ?? []).reduce((acc, panel) => {
    return aromaGroups.reduce((acc2, group) => {
      acc2[group] = (acc2[group] ?? 0) + panel[group];
      return acc2;
    }, acc);
  }, {} as HopSensoryChartData);
  return aromaGroups.reduce((acc, g) => {
    acc[g] = res[g] / (src?.hopSensoryPanels?.length ?? 1);
    return acc;
  }, {} as HopSensoryChartData);
}

export function HopSensory({ hop }: HopSensoryProps) {
  const data = makeAvgChartData(hop!);
  return (
    <div className="grid grid-cols-1">
      <HopSensoryChart data={data} src={hop} />
    </div>
  );
}

export default HopSensory;
