import type { Hop as HopType } from "@prisma/client";
import { Prop } from "@/components/Prop";
import { Card } from "@/components/ui/card";

export type HopDisplayProps = {
  //slug: string;
  hop: HopType;
};
//import { Range } from "@/components/Range";
import { HopInput } from "@/types/ingredient";
const SummaryTab = dynamic(
  () => import("../../_components/HopDisplay/SummaryTab")
);
const CompositionTab = dynamic(
  () => import("../../_components/HopDisplay/CompositionTab"),
  { ssr: false }
);
const SensoryTab = dynamic(
  () => import("../../_components/HopDisplay/SensoryTab"),
  { ssr: false }
);

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
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
    <Tabs defaultValue="summary">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="composition">Composition</TabsTrigger>
        <TabsTrigger value="sensory">Sensory</TabsTrigger>
      </TabsList>
      <TabsContent value="summary">
        <SummaryTab src={hop} />
      </TabsContent>
      <TabsContent value="composition">
        <CompositionTab src={hop} />
      </TabsContent>

      <TabsContent value="sensory">
        <SensoryTab src={hop} />
      </TabsContent>
    </Tabs>
  );
}
/**(
    <AppBarLayout
      title={<AppBarTitle icon={<Hop />}>{hop?.name}</AppBarTitle>}
      actions={<HopDisplayActions slug={hop.slug} />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
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
    </AppBarLayout>
  )*/
export default HopDisplay;
