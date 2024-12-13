import { Prop } from "@/components/Prop";
import { Card } from "@/components/ui/card";
import { Fermentable } from "@prisma/client";

export type FermentableSummaryTabProps = {
  src?: Fermentable | null;
};
export function FermentableSummaryTab({ src }: FermentableSummaryTabProps) {
  return (
    <div className="pt-0">
      <Card className="m-4 *:border-b-2 last-of-type:*:border-b-0 ">
        <Prop label="Name" value={src?.name} />
        <Prop label="Country" value={src?.country} />
        <Prop label="Notes" value={src?.notes} />
        <Prop label="Color" value={src?.color} />
        <Prop label="Potential" value={src?.potential} />
        <Prop label="Power" value={src?.power} />
      </Card>
    </div>
  );
}
