import { Prop } from "@/app/ingredients/hops/_components/HopDisplay/SummaryTab";
import { AppBarAction } from "@/components/AppBar";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Fermentable } from "@prisma/client";

export type FermentableDisplayProps = {
  src?: Fermentable | null;
};
const makeActions: (fermentable: Fermentable) => AppBarAction[] = (
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
      <div className="">
        <Prop label="Name" value={src?.name} />
        <Prop label="Country" value={src?.country} />
        <Prop label="Color" value={src?.color} />
        <Prop label="Potential" value={src?.potential} />
        <Prop label="Power" value={src?.power} />
      </div>
      ;
    </AppBarLayout>
  );
}

export default FermentableDisplay;
