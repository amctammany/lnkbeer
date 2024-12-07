import { Prop } from "@/components/Prop";
import { AppBarAction } from "@/components/AppBar";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Card } from "@/components/ui/card";
import { Yeast } from "@prisma/client";

export type YeastDisplayProps = {
  src?: Yeast | null;
};
const makeActions: (yeast: Yeast) => AppBarAction[] = (yeast) => [
  { text: "Edit", url: `/ingredients/yeasts/${yeast.slug}/edit` },
];

export function YeastDisplay({ src }: YeastDisplayProps) {
  return (
    <AppBarLayout title={`Yeast: ${src?.name}`} actions={makeActions(src!)}>
      <div className="container pt-4">
        <Card className="m-4 *:border-b-2 last-of-type:*:border-b-0 ">
          <Prop label="Name" value={src?.name} />
          <Prop label="Notes" value={src?.notes} />
          <Prop label="Manufacturer" value={src?.manufacturer} />
          <Prop label="Attenuation" value={src?.attenuation} />
          <Prop label="Flocculation" value={src?.flocculation} />
        </Card>
      </div>
      ;
    </AppBarLayout>
  );
}

export default YeastDisplay;
