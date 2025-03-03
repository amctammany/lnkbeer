import { Prop } from "@/components/Prop";
import { Card } from "@/components/ui/card";
import type { Yeast } from "@prisma/client";

export function YeastSummaryTab({ src }: { src?: Yeast | null }) {
  return (
    <div className="">
      <Card className="m-4 *:border-b-2 *:last-of-type:border-b-0 ">
        <Prop label="Name" value={src?.name} />
        <Prop label="Notes" value={src?.notes} />
        <Prop label="Manufacturer" value={src?.manufacturer} />
        <Prop label="Attenuation" value={src?.attenuation} />
        <Prop
          label="Attenuation Range"
          value={`${src?.attenuationLow} - ${src?.attenuationHigh}`}
        />
        <Prop
          label="Temperature Range"
          value={`${src?.tempLow} - ${src?.tempHigh}`}
        />
        <Prop label="Type" value={src?.type} />
        <Prop label="Flocculation" value={src?.flocculation} />
      </Card>
    </div>
  );
}
