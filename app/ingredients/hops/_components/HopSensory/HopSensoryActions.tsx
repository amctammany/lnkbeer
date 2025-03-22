import { AppBarItem } from "@/components/AppBarItem";
import { Edit, Folder } from "lucide-react";

export const HopSensoryActions = ({ slug }: { slug: string }) => {
  return [
    <AppBarItem
      key="summary"
      text="Summary"
      url={`/ingredients/hops/${slug}`}
      icon={<Folder />}
    />,

    <AppBarItem
      key="edit"
      text="Edit"
      url={`/ingredients/hops/${slug}/sensory/edit`}
      icon={<Edit />}
    />,
  ];
};
