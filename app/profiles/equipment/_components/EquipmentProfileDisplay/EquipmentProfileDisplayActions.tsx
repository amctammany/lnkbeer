import { Prop } from "@/components/Prop";
import { AppBarItem } from "@/components/AppBarItem";
import { AppBarLayout } from "@/components/AppBarLayout";
import { Card } from "@/components/ui/card";
import { Edit, ForkKnife } from "lucide-react";
import { ExtendedEquipmentProfile } from "@/types/Profile";

export type EquipmentProfileDisplayActionsProps = {
  src?: ExtendedEquipmentProfile | null;
};

export const EquipmentProfileDisplayActions = ({
  src,
}: EquipmentProfileDisplayActionsProps) => {
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

export default EquipmentProfileDisplayActions;
