//import { AppBarLayout } from "@/components/AppBarLayout";
//import { DataTable } from "@/components/DataTable";
import { Edit, ForkKnife } from "lucide-react";
import { AppBarItem } from "@/components/AppBarItem";
import { ExtendedMashProfile } from "@/types/Profile";

export type MashProfilesTableActionsProps = {
  src?: ExtendedMashProfile | null;
};
export const MashProfilesTableActions = ({
  src,
}: MashProfilesTableActionsProps) => {
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
export default MashProfilesTableActions;
