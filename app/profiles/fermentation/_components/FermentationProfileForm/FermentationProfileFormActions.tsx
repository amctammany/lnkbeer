import {
  ExtendedFermentationProfile,
  ExtendedFermentationStep,
} from "@/types/Profile";
import { Plus, Save } from "lucide-react";
import { AppBarItem } from "@/components/AppBarItem";

export const FermentationProfileFormActions = ({
  src,
}: {
  src?: ExtendedFermentationProfile | null;
}) => {
  return [<AppBarItem key="save" text="Save" type="submit" icon={<Save />} />];
};

export default FermentationProfileFormActions;
