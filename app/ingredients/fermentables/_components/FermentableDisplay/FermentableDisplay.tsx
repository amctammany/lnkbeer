import { Prop } from "@/components/Prop";
import { AppBarActionProps } from "@/components/AppBar";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Card } from "@/components/ui/card";
import { Fermentable } from "@prisma/client";

export type FermentableDisplayProps = {
  src?: Fermentable | null;
};
const makeActions: (fermentable: Fermentable) => AppBarActionProps[] = (
  fermentable,
) => [
  { text: "Edit", url: `/ingredients/fermentables/${fermentable.slug}/edit` },
];

export function FermentableDisplay({ src }: FermentableDisplayProps) {
  return (
    <AppBarLayout
      title={`Fermentable: ${src?.name}`}
      actions={makeActions(src!)}
    >
      <div className="pt-4">
        <Card className="m-4 *:border-b-2 last-of-type:*:border-b-0 ">
          <Prop label="Name" value={src?.name} />
          <Prop label="Country" value={src?.country} />
          <Prop label="Notes" value={src?.notes} />
          <Prop label="Color" value={src?.color} />
          <Prop label="Potential" value={src?.potential} />
          <Prop label="Power" value={src?.power} />
        </Card>
      </div>
      ;
    </AppBarLayout>
  );
}

export default FermentableDisplay;
