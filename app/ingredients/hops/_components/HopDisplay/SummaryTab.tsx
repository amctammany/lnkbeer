import { Hop } from "@prisma/client";

export type SummaryTabProps = {
  src: Hop;
};
type PropProps = {
  label: string;
  value: string | number | null;
};
const Prop = ({ label, value }: PropProps) => {
  return (
    <div>
      <b className="font-bold px-2">{label}:</b>
      <span>{value}</span>
    </div>
  );
  /**
  return (
    <div className="flex border-2 mb-1">
      <span className="bg-slate-200 px-2">{label}</span>
      <span className="flex-grow px-2">{value}</span>
    </div>
  );
   */
};
export function SummaryTab({ src }: SummaryTabProps) {
  return (
    <div className="">
      <Prop label="Name" value={src.name} />
      <Prop label="Country" value={src.country} />
      <Prop label="Usage" value={src.usage} />
      <Prop label="Characteristics" value={src.characteristics} />
    </div>
  );
}

export default SummaryTab;
