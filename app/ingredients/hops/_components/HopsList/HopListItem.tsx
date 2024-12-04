import { ListItem } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { Separator } from "@/components/ui/separator";
import { Hop } from "@prisma/client";
import {
  BicepsFlexed,
  Hop as HopIcon,
  House,
  SquareScissors,
} from "lucide-react";
import { Badge } from "@/components/Badge";
export type HopListItemProps = {
  hop: Hop;
};
export const HopListItem = ({ hop }: HopListItemProps) => {
  const secondaryText = (
    <div className="flex h-5 items-center space-x-4 text-sm ">
      <Badge icon={<House />} label="Country">
        {hop.country}
      </Badge>
      <Badge icon={<BicepsFlexed />} label="Alpha">
        {hop.alpha}
      </Badge>
      <Badge icon={<SquareScissors />} label="Usage">
        {hop.usage}
      </Badge>
    </div>
  );
  return (
    <ListItem
      className="block px-2 py-3"
      key={hop.id}
      href={`/ingredients/hops/${hop.slug}`}
    >
      <ListItemIcon>
        <HopIcon />
      </ListItemIcon>
      <ListItemText primary={hop.name} secondary={secondaryText} />
    </ListItem>
  );
};
