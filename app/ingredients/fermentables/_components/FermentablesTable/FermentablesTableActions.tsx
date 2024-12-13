import { AppBarItem } from "@/components/AppBarItem";
import { Plus } from "lucide-react";

export const FermentablesTableActions = () => {
  return [
    <AppBarItem
      key="new"
      text="New"
      url="/ingredients/fermentables/new"
      icon={<Plus />}
    />,
  ];
};
export default FermentablesTableActions;
