import { AppBarItem } from "@/components/AppBarItem";
import { Edit } from "lucide-react";

export const HopDisplayActions = ({ slug }: { slug: string }) => {
  return [
    <AppBarItem
      key="edit"
      text="Edit"
      url={`/ingredients/hops/${slug}/edit`}
      icon={<Edit />}
    />,
  ];
};
