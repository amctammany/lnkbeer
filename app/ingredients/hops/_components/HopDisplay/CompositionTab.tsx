import { Range } from "@/components/Range";
import { Card } from "@/components/ui/card";
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

export type CompositionTabProps = {
  src: HopInput;
};
export function CompositionTab({ src }: CompositionTabProps) {
  return (
    <div className="">
      <Card className="m-4 p-2 *:border-b-2 *:last-of-type:border-b-0 ">
        {rangeProps(src).map((props) => (
          <Range key={props.name} label={props.name} {...props} />
        ))}
      </Card>
    </div>
  );
}

export default CompositionTab;
