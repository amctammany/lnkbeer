import { Prop } from "@/components/Prop";
import { AppBarItem, AppBarItemProps } from "@/components/AppBarItem";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Card } from "@/components/ui/card";
import { Fermentable } from "@prisma/client";
import { Edit } from "lucide-react";

export type FermentableDisplayProps = {
  src?: Fermentable | null;
};
const FermentableDisplayActions = ({ src }: FermentableDisplayProps) => {
  return [
    <AppBarItem
      key="edit"
      text="Edit"
      url={`/ingredients/fermentables/${src?.slug}/edit`}
      icon={<Edit />}
    />,
  ];
};
export function FermentableDisplay({ src }: FermentableDisplayProps) {
  return (
    <AppBarLayout
      title={`Fermentable: ${src?.name}`}
      actions={<FermentableDisplayActions src={src} />}
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
