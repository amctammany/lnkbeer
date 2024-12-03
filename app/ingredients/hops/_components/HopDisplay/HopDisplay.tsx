import { AppBarAction } from "@/components/AppBar";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Range } from "@/components/Range";
import { HopInput } from "@/types/ingredient";
import { Hop } from "@prisma/client";

export type HopDisplayProps = {
  hop?: Hop | null;
};
type RangeProp = {
  name: keyof HopInput;
  min: number;
  max: number;
  range: [number, number];
  value?: number;
};
const rangeProps: (hop: HopInput) => RangeProp[] = (hop) => [
  {
    name: "alphaRange",
    min: 0,
    max: 50,
    range: [hop.alphaLow!, hop.alphaHigh!],
  },
  {
    name: "betaRange",
    min: 0,
    max: 50,
    range: [hop.betaLow!, hop.betaHigh!],
  },
  {
    name: "caryophylleneRange",
    min: 0,
    max: 50,
    range: [hop.caryophylleneLow!, hop.caryophylleneHigh!],
  },
  {
    name: "cohumuloneRange",
    min: 0,
    max: 50,
    range: [hop.cohumuloneLow!, hop.cohumuloneHigh!],
  },
  {
    name: "myrceneRange",
    min: 0,
    max: 50,
    range: [hop.myrceneLow!, hop.myrceneHigh!],
  },
  {
    name: "totalOilRange",
    min: 0,
    max: 50,
    range: [hop.totalOilLow!, hop.totalOilHigh!],
  },
];
const makeActions: (hop: Hop) => AppBarAction[] = (hop) => [
  { text: "Edit", url: `/ingredients/hops/${hop.slug}/edit` },
];
export function HopDisplay({ hop }: HopDisplayProps) {
  if (!hop) return <div>Bad</div>;
  return (
    <AppBarLayout title={`Hop: ${hop?.name}`} actions={makeActions(hop!)}>
      <div className="">
        {rangeProps(hop).map((props) => (
          <Range key={props.name} label={props.name} {...props} />
        ))}
        {Object.entries(hop || {}).map(([key, value]) => (
          <div key={key} className="flex border-2 mb-1">
            <span className="bg-slate-200 px-2">{key}</span>
            <span className="flex-grow px-2">{value}</span>
          </div>
        ))}
      </div>
    </AppBarLayout>
  );
}

export default HopDisplay;
