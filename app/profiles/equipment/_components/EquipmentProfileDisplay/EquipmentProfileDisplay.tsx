import { Prop } from "@/components/Prop";
import { AppBarItem } from "@/components/AppBarItem";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Card } from "@/components/ui/card";
import { Edit, ForkKnife } from "lucide-react";
import { ExtendedEquipmentProfile } from "@/types/Profile";

export type EquipmentProfileDisplayProps = {
  src?: ExtendedEquipmentProfile | null;
};

const EquipmentProfileDisplayActions = ({
  src,
}: EquipmentProfileDisplayProps) => {
  return [
    <AppBarItem
      key="edit"
      text="Edit"
      url={`/profiles/equipment/${src?.slug}/edit`}
      icon={<Edit />}
    />,
    <AppBarItem
      key="fork"
      text="Fork"
      url={`/profiles/equipment/${src?.slug}/fork`}
      icon={<ForkKnife />}
    />,
  ];
};

export function EquipmentProfileDisplay({ src }: EquipmentProfileDisplayProps) {
  return (
    <AppBarLayout
      title={`EquipmentProfile: ${src?.name}`}
      actions={<EquipmentProfileDisplayActions src={src} />}
    >
      <div className="pt-4">
        <Card className="m-4 *:border-b-2 last-of-type:*:border-b-0 ">
          <Prop label="Name" value={src?.name} />
          <Prop label="Forks" value={src?.forks.length} />
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
          <Prop
            label="Grain Absorption"
            value={src?.grainAbsorption}
            unit="gal"
          />
          <Prop label="Water Grain Ratio" value={src?.waterGrainRatio} />
        </Card>
      </div>
      ;
    </AppBarLayout>
  );
}

export default EquipmentProfileDisplay;
