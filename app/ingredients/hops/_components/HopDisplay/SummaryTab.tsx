import { Prop } from "@/components/Prop";
import { Card } from "@/components/ui/card";
import { Hop } from "@prisma/client";

export type SummaryTabProps = {
  src: Hop;
};
export function SummaryTab({ src }: SummaryTabProps) {
  return (
    <div className="">
      <Card className="m-4 *:border-b-2 last-of-type:*:border-b-0 ">
        <Prop label="Name" value={src.name} />
        <Prop label="Country" value={src.country} />
        <Prop label="Usage" value={src.usage} />
        <Prop label="Characteristics" value={src.characteristics} />
      </Card>
    </div>
  );
}

export default SummaryTab;
