import { Prop } from "@/components/Prop";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Card } from "@/components/ui/card";
import { WaterProfile } from "@prisma/client";
import { Ca2, Cl, HCO3, MgSo4, Na, SO4 } from "@/components/Elements";
import { Edit, ForkKnife } from "lucide-react";
import { AppBarItem } from "@/components/AppBarItem";
import { ExtendedWaterProfile } from "@/types/Profile";

export type WaterProfileDisplayProps = {
  src?: ExtendedWaterProfile | null;
};
const WaterProfileDisplayActions = ({ src }: { src?: WaterProfile | null }) => {
  return [
    <AppBarItem
      key="edit"
      text="Edit"
      url={`/profiles/water/${src?.slug}/edit`}
      icon={<Edit />}
    />,
    <AppBarItem
      key="fork"
      text="Fork"
      url={`/profiles/water/${src?.slug}/fork`}
      icon={<ForkKnife />}
    />,
  ];
};

export function WaterProfileDisplay({ src }: WaterProfileDisplayProps) {
  return (
    <AppBarLayout
      title={`WaterProfile: ${src?.name}`}
      actions={<WaterProfileDisplayActions src={src} />}
    >
      <div className="pt-4">
        <Card className="m-4 *:border-b-2 last-of-type:*:border-b-0 ">
          <Prop label="Name" value={src?.name} />
          <Prop label="Forks" value={src?.forks.length} />
          <Prop label={<Ca2 />} value={src?.calcium} unit="ppm" />
          <Prop label={<Cl />} value={src?.chloride} unit="ppm" />
          <Prop label={<MgSo4 />} value={src?.magnesium} unit="ppm" />
          <Prop label={<SO4 />} value={src?.sulfate} unit="ppm" />
          <Prop label={<Na />} value={src?.sodium} unit="ppm" />
          <Prop label={<HCO3 />} value={src?.bicarbonate} unit="ppm" />
        </Card>
      </div>
      ;
    </AppBarLayout>
  );
}

export default WaterProfileDisplay;
