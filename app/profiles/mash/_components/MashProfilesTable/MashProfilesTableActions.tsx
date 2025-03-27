//import { AppBarLayout } from "@/components/AppBarLayout";
//import { DataTable } from "@/components/DataTable";
import { Plus } from "lucide-react";
import { AppBarItem } from "@/components/AppBarItem";
import { ExtendedMashProfile } from "@/types/Profile";

export type MashProfilesTableActionsProps = {
  src?: ExtendedMashProfile | null;
};
export const MashProfilesTableActions = (
  {
    //src,
  }: MashProfilesTableActionsProps
) => {
  return [
    <AppBarItem
      key="new"
      text="New"
      url="/profiles/mash/new"
      icon={<Plus />}
    />,
  ];
};
export default MashProfilesTableActions;
