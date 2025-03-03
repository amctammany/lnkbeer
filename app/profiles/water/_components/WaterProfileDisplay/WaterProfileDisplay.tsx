import { Prop } from "@/components/Prop";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Card } from "@/components/ui/card";
import { Ca2, Cl, HCO3, MgSo4, Na, SO4 } from "@/components/Elements";
import { ExtendedWaterProfile } from "@/types/Profile";
import WaterProfileDisplayActions from "./WaterProfileDisplayActions";
import Link from "next/link";
import AppBarTitle from "@/components/AppBarTitle";
import { Waves } from "lucide-react";

export type WaterProfileDisplayProps = {
  src?: ExtendedWaterProfile | null;
};

export function WaterProfileDisplay({ src }: WaterProfileDisplayProps) {
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<Waves />}>{src?.name}</AppBarTitle>}
      actions={<WaterProfileDisplayActions src={src} />}
    >
      <div className="pt-4">
        <Card className="m-4 *:border-b-2 *:last-of-type:border-b-0 ">
          <Prop label="Name" value={src?.name} />
          <Prop
            label="Forked From"
            value={
              <Link
                className="underline"
                href={`/profiles/water/${src?.origin?.slug}`}
              >
                {src?.origin?.name}
              </Link>
            }
          />
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
