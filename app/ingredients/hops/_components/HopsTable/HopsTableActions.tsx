import { AppBarItem } from "@/components/AppBarItem";
import { Plus } from "lucide-react";

export const HopsTableActions = () => {
  return [
    <AppBarItem
      key="new"
      url="/ingredients/hops/new"
      text="New"
      icon={<Plus />}
    />,
  ];
};

export default HopsTableActions;
