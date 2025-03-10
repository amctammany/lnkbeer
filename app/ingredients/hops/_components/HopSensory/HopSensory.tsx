"use client";
import type { Hop } from "@prisma/client";
import { Prop } from "@/components/Prop";
import { Card } from "@/components/ui/card";
//import { HopSensoryChart } from "../HopSensoryChart";
import dynamic from "next/dynamic";
const HopSensoryChart = dynamic(
  () => import("../HopSensoryChart/HopSensoryChart"),
  { ssr: false },
);

export type HopSensoryProps = {
  //slug: string;
  hop?: Hop | null;
};
export async function HopSensory({ hop }: HopSensoryProps) {
  return (
    <div className="grid grid-cols-1">
      <HopSensoryChart src={hop} />
    </div>
  );
}

export default HopSensory;
