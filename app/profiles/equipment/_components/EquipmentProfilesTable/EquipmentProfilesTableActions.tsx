import { EquipmentProfile } from "@prisma/client";
import { Plus } from "lucide-react";
import { AppBarItem } from "@/components/AppBarItem";
export const EquipmentProfilesTableActions = ({
  src,
}: {
  src?: EquipmentProfile | null;
}) => {
  return [
    <AppBarItem
      key="new"
      text="new"
      url="/profiles/equipment/new"
      icon={<Plus />}
    />,
  ];
};

export type EquipmentProfilesTableProps = {
  equipmentProfiles?: EquipmentProfile[];
};
export default EquipmentProfilesTableActions;
