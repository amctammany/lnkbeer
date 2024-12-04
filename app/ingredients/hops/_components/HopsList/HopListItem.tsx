import { Hop } from "@prisma/client";
import {
  BicepsFlexed,
  Home,
  Hop as HopIcon,
  House,
  SquareScissors,
} from "lucide-react";
import { Badge, TooltipBadge } from "@/components/Badge";
import Link from "next/link";
export type HopListItemProps = {
  hop: Hop;
};
export const HopItem = ({ style, data, index }) => {
  const hop = data[index] as Hop;
  return (
    <div
      className="bg-white hover:bg-primary-500/10 p-2 even:bg-primary-foreground even:hover:bg-slate-500/10 odd:bg-slate-200 odd:hover:bg-slate-500/10"
      style={style}
    >
      <Link
        className="p-0 my-auto grid grid-rows-2 md:flex lg:grid lg:grid-cols-2"
        href={`/ingredients/hops/${hop.slug}/edit`}
      >
        <span className="block font-bold text-sm md:text-lg md:flex-grow my-auto">
          {hop.name}
        </span>
        <div className="grid grid-cols-3 justify-around md:justify-around mr-auto gap-4">
          <Badge icon={<Home />}>{hop.country}</Badge>
          <Badge icon={<BicepsFlexed />} label="Alpha">
            {hop.alpha}
          </Badge>
          <Badge icon={<SquareScissors />} label="Usage">
            {hop.usage}
          </Badge>
        </div>
      </Link>
    </div>
  );
};
/**
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
 */
