//import { AppBarLayout } from "@/components/AppBarLayout";
//import { DataTable } from "@/components/DataTable";
import { Edit, ForkKnife, Plus } from "lucide-react";
import { AppBarItem } from "@/components/AppBarItem";
import { ExtendedFermentationProfile } from "@/types/Profile";

export type FermentationProfilesTableActionsProps = {
  src?: ExtendedFermentationProfile | null;
};
export const FermentationProfilesTableActions = ({
  src,
}: FermentationProfilesTableActionsProps) => {
  return [
    <AppBarItem
      key="new"
      text="New"
      url="/profiles/fermentation/new"
      icon={<Plus />}
    />,
  ];
};
export default FermentationProfilesTableActions;