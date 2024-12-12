import { ExtendedMashProfile, ExtendedMashStep } from "@/types/Profile";
import { Plus, Save } from "lucide-react";
import { AppBarItem } from "@/components/AppBarItem";

export const MashProfileFormActions = ({
  src,
}: {
  src?: ExtendedMashProfile | null;
}) => {
  return [<AppBarItem key="save" text="Save" type="submit" icon={<Save />} />];
};

export default MashProfileFormActions;
