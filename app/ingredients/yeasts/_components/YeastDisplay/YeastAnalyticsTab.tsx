import { Prop } from "@/components/Prop";
import { Card } from "@/components/ui/card";
import type { Yeast } from "@prisma/client";

export function YeastAnalyticsTab({ src }: { src?: Yeast | null }) {
  return (
    <div className="">
      <Card className="m-4 *:border-b-2 last-of-type:*:border-b-0 ">
        Analytics
      </Card>
    </div>
  );
}
