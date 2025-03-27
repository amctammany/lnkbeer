import { Card } from "@/components/ui/card";
import { Fermentable } from "@prisma/client";

export type FermentableAnalyticsTabProps = {
  src: Fermentable;
};
export function FermentableAnalyticsTab({ src }: FermentableAnalyticsTabProps) {
  return (
    <div className="pt-0">
      <Card className="m-4 *:border-b-2 *:last-of-type:border-b-0 ">
        Analytics
        <span>{src.name}</span>
      </Card>
    </div>
  );
}
