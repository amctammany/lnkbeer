import { Plus } from "lucide-react";
import { AppBarItem } from "@/components/AppBarItem";
export const WaterProfilesTableActions = () => {
  return [
    <AppBarItem
      key="new"
      text="New"
      url="/profiles/water/new"
      icon={<Plus />}
    />,
  ];
};

export default WaterProfilesTableActions;
