import { Prop } from "@/components/Prop";
import { Hop } from "@prisma/client";

export type SummaryTabProps = {
  src: Hop;
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
