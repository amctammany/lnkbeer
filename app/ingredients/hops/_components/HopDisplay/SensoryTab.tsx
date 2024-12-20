import { Prop } from "@/components/Prop";
import { Card } from "@/components/ui/card";
import { ExtendedHop } from "@/types/ingredient";
import { Hop } from "@prisma/client";

export type SensoryTabProps = {
  src: ExtendedHop;
};
export function SensoryTab({ src }: SensoryTabProps) {
  return (
    <div className="">
      <Card className="m-4 *:border-b-2 last-of-type:*:border-b-0 ">
        <Prop label="Name" value={src.name} />
        {JSON.stringify(src?.hopSensoryPanels)}
      </Card>
    </div>
  );
}

export default SensoryTab;
