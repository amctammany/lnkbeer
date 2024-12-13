import { Prop } from "@/components/Prop";
import { AppBarItem, AppBarItemProps } from "@/components/AppBarItem";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Card } from "@/components/ui/card";
import { YeastInput } from "@/types/ingredient";
import { Edit, FlaskConical } from "lucide-react";
import AppBarTitle from "@/components/AppBarTitle";

export type YeastDisplayProps = {
  src?: YeastInput | null;
};
const YeastDisplayActions = ({ src }: { src?: YeastInput | null }) => {
  return [
    <AppBarItem
      key="edit"
      text="Edit"
      url={`/ingredients/yeasts/${src?.slug}/edit`}
      icon={<Edit />}
    />,
  ];
};

export function YeastDisplay({ src }: YeastDisplayProps) {
  return (
    <AppBarLayout
      title={<AppBarTitle icon={<FlaskConical />}>{src?.name}</AppBarTitle>}
      actions={<YeastDisplayActions src={src} />}
    >
      <div className="">
        <Card className="m-4 *:border-b-2 last-of-type:*:border-b-0 ">
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
      ;
    </AppBarLayout>
  );
}

export default YeastDisplay;
