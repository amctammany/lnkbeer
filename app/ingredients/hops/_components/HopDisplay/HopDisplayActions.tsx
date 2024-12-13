import { AppBarItem } from "@/components/AppBarItem";
import { Hop } from "@prisma/client";
import { Edit } from "lucide-react";

export const HopDisplayActions = ({ src }: { src?: Hop | null }) => {
  return [
    <AppBarItem
      key="edit"
      text="Edit"
      url={`/ingredients/hops/${src?.slug}/edit`}
      icon={<Edit />}
    />,
  ];
};
