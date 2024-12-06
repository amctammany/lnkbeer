import { Hop } from "@prisma/client";

export type SummaryTabProps = {
  src: Hop;
};
type PropProps = {
  label: string;
  value?: string | number | null;
};
export const Prop = ({ label, value }: PropProps) => {
  return (
    <div className="flex h-8 align-top">
      <span className="leading-5 mt-1.5 font-sans text-gray-600 px-2 flex-shrink ">
        {label}:
      </span>
      <span className="mt-2 leading-5 font-mono flex-grow">{value}</span>
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
