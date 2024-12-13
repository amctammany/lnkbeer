import { AppBarItem } from "@/components/AppBarItem";
import { Edit } from "lucide-react";

export const FermentableDisplayActions = ({ slug }: { slug: string }) => {
  return [
    <AppBarItem
      key="edit"
      text="Edit"
      url={`/ingredients/fermentables/${slug}/edit`}
      icon={<Edit />}
    />,
  ];
};
