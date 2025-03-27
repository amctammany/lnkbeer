import { ExtendedMashProfile } from "@/types/Profile";
import { Save } from "lucide-react";
import { AppBarItem } from "@/components/AppBarItem";

export const MashProfileFormActions = ({}: {
  src?: ExtendedMashProfile | null;
}) => {
  return [<AppBarItem key="save" text="Save" type="submit" icon={<Save />} />];
};

export default MashProfileFormActions;
