import { AppBarItem } from "@/components/AppBarItem";
import { FermentationProfile } from "@prisma/client";
import { Edit, Save } from "lucide-react";

export type FermentationProfileDisplayActionsProps = {
  src?: FermentationProfile | null;
};
export const FermentationProfileDisplayActions = ({
  src,
}: FermentationProfileDisplayActionsProps) => {
  return [
    <AppBarItem
      key="edit"
      text="Edit"
      url={`/profiles/fermentation/${src?.slug}/edit`}
      icon={<Edit />}
    />,
  ];
};

export default FermentationProfileDisplayActions;
