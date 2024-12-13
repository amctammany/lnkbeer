import { AppBarItem } from "@/components/AppBarItem";
import { Plus } from "lucide-react";

export const YeastsTableActions = () => {
  return [
    <AppBarItem
      key="new"
      text="New"
      url="/ingredients/yeasts/new"
      icon={<Plus />}
    />,
  ];
};
