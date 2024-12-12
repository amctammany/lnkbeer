import { Edit, ForkKnife } from "lucide-react";
import { AppBarItem } from "@/components/AppBarItem";
import { ExtendedWaterProfile } from "@/types/Profile";

export type WaterProfileDisplayActionsProps = {
  src?: ExtendedWaterProfile | null;
};
export const WaterProfileDisplayActions = ({
  src,
}: WaterProfileDisplayActionsProps) => {
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

export default WaterProfileDisplayActions;
