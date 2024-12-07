import { Prop } from "@/components/Prop";
import { AppBarAction } from "@/components/AppBar";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Card } from "@/components/ui/card";
import { EquipmentProfile } from "@prisma/client";

export type EquipmentProfileDisplayProps = {
  src?: EquipmentProfile | null;
};
const makeActions: (equipmentProfile: EquipmentProfile) => AppBarAction[] = (
  equipmentProfile,
) => [
  { text: "Edit", url: `/profiles/equipment/${equipmentProfile.slug}/edit` },
];

export function EquipmentProfileDisplay({ src }: EquipmentProfileDisplayProps) {
  return (
    <AppBarLayout
      title={`EquipmentProfile: ${src?.name}`}
      actions={makeActions(src!)}
    >
      <div className="pt-4">
        <Card className="m-4 *:border-b-2 last-of-type:*:border-b-0 ">
          <Prop label="Name" value={src?.name} />
          <Prop label="Description" value={src?.description} />
          <Prop label="Batch Volume" value={src?.batchVolume} unit="gal" />
          <Prop label="Boil Time" value={src?.boilTime} unit="min" />
          <Prop label="Mash Efficiency" value={src?.mashEfficiency} unit="%" />
          <Prop label="Brew Efficiency" value={src?.brewEfficiency} unit="%" />
          <Prop label="Boil Off Rate" value={src?.boilOffRate} unit="gal/hr" />
          <Prop label="Pre-Boil Volume" value={src?.preboilVolume} unit="gal" />
          <Prop label="Trub Loss" value={src?.trubLoss} unit="gal" />
          <Prop label="Mash Loss" value={src?.mashLoss} unit="gal" />
          <Prop label="Fermenter Loss" value={src?.fermenterLoss} unit="gal" />
        </Card>
      </div>
      ;
    </AppBarLayout>
  );
}

export default EquipmentProfileDisplay;
