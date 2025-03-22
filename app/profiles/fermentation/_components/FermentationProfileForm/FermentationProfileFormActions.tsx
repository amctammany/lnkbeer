import { Save } from "lucide-react";
import { AppBarItem } from "@/components/AppBarItem";
import { FermentationProfileSchema } from "@/schemas/fermentationProfileSchema";

export const FermentationProfileFormActions = (
  {
    //src,
  }: {
    src?: FermentationProfileSchema | null;
  }
) => {
  return [<AppBarItem key="save" text="Save" type="submit" icon={<Save />} />];
};

export default FermentationProfileFormActions;
