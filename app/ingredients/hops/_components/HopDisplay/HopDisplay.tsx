import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompositionTab from "./CompositionTab";
import NotesTab from "./NotesTab";
import SummaryTab from "./SummaryTab";
import SensoryTab from "./SensoryTab";
import { Hop as HopIcon } from "lucide-react";
import { getHop } from "@/app/ingredients/hops/queries";
import { Suspense } from "react";
import type { Hop } from "@prisma/client";
import { Prop } from "@/components/Prop";
import { Card } from "@/components/ui/card";

export type HopDisplayProps = {
  //slug: string;
  hop?: Hop | null;
};
import { Range } from "@/components/Range";
import { HopInput } from "@/types/ingredient";
type RangeProp = {
  name: keyof HopInput;
  label?: string;
  min: number;
  max: number;
  range: [number, number];
  value?: number;
};
const rangeProps: (hop: HopInput) => RangeProp[] = (hop) => [
  {
    name: "alphaRange",
    label: "Alpha",
    min: 0,
    max: 30,
    range: [hop.alphaLow!, hop.alphaHigh!],
  },
  {
    name: "betaRange",
    label: "Beta",
    min: 0,
    max: 25,
    range: [hop.betaLow!, hop.betaHigh!],
  },
  {
    name: "caryophylleneRange",
    label: "Caryophyllene",
    min: 0,
    max: 20,
    range: [hop.caryophylleneLow!, hop.caryophylleneHigh!],
  },
  {
    name: "cohumuloneRange",
    label: "Cohumulone",
    min: 0,
    max: 70,
    range: [hop.cohumuloneLow!, hop.cohumuloneHigh!],
  },
  {
    name: "myrceneRange",
    label: "Myrcene",
    min: 0,
    max: 80,
    range: [hop.myrceneLow!, hop.myrceneHigh!],
  },
  {
    name: "totalOilRange",
    label: "Total Oils",
    min: 0,
    max: 8,
    range: [hop.totalOilLow!, hop.totalOilHigh!],
  },
];

export async function HopDisplay({ hop }: HopDisplayProps) {
  return (
    <div className="grid lg:grid-cols-2">
      <Card className="m-4  *:border-b-2 *:last-of-type:border-b-0 ">
        <Prop label="Name" value={hop?.name} />
        <Prop label="Country" value={hop?.country} />
        <Prop label="Usage" value={hop?.usage} />
        <Prop label="Characteristics" value={hop?.characteristics} />
        <Prop label="Alpha" value={hop?.alpha} />
        <Prop label="Beta" value={hop?.beta} />
      </Card>
      <Card className="m-4  *:border-b-2 *:last-of-type:border-b-0 ">
        <div className="m-2">
          {rangeProps(hop!).map((props) => (
            <Range key={props.name} label={props.name} {...props} />
          ))}
        </div>
      </Card>
    </div>
  );
}

export default HopDisplay;
