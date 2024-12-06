import { Range } from "@/components/Range";
import { HopInput } from "@/types/ingredient";
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

export type CompositionTabProps = {
  src: HopInput;
};
export function CompositionTab({ src }: CompositionTabProps) {
  return (
    <div className="">
      {rangeProps(src).map((props) => (
        <Range key={props.name} label={props.name} {...props} />
      ))}
    </div>
  );
}

export default CompositionTab;
