import { AppBarItem } from "@/components/AppBarItem";
import { EquipmentProfile } from "@prisma/client";
import { Save } from "lucide-react";

export type EquipmentProfileFormActionsProps = {
  src?: EquipmentProfile | null;
};
export const EquipmentProfileFormActions =
  ({}: EquipmentProfileFormActionsProps) => {
    return [
      <AppBarItem key="save" text="Save" type="submit" icon={<Save />} />,
    ];
  };

export default EquipmentProfileFormActions;
