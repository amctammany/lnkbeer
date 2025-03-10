import { AppBarItem } from "@/components/AppBarItem";
import { ChartNoAxesCombined, Edit } from "lucide-react";

export const HopDisplayActions = ({ slug }: { slug: string }) => {
  return [
    <AppBarItem
      key="sensory"
      text="Sensory"
      url={`/ingredients/hops/${slug}/sensory`}
      icon={<ChartNoAxesCombined />}
    />,

    <AppBarItem
      key="edit"
      text="Edit"
      url={`/ingredients/hops/${slug}/edit`}
      icon={<Edit />}
    />,
  ];
};
