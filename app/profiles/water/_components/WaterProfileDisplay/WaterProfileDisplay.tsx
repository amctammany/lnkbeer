import { Prop } from "@/components/Prop";
import { AppBarAction } from "@/components/AppBar";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Card } from "@/components/ui/card";
import { WaterProfile } from "@prisma/client";
import { Ca2, Cl, HCO3, MgSo4, Na, SO4 } from "@/components/Elements";

export type WaterProfileDisplayProps = {
  src?: WaterProfile | null;
};
const makeActions: (waterProfile: WaterProfile) => AppBarAction[] = (
  waterProfile,
) => [{ text: "Edit", url: `/profiles/water/${waterProfile.slug}/edit` }];

export function WaterProfileDisplay({ src }: WaterProfileDisplayProps) {
  return (
    <AppBarLayout
      title={`WaterProfile: ${src?.name}`}
      actions={makeActions(src!)}
    >
      <div className="pt-4">
        <Card className="m-4 *:border-b-2 last-of-type:*:border-b-0 ">
          <Prop label="Name" value={src?.name} />
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
