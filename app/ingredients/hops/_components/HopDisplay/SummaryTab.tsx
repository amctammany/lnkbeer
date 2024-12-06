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
    <div className="flex h-8 ">
      <span className="h-6 my-auto text-[11pt] font-bold text-gray-600 px-2 flex-shrink-0 ">
        {label}:
      </span>
      <span className="h-6 my-auto text-[11pt] font-mono align-text-bottom flex-grow">
        {value}
      </span>
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
