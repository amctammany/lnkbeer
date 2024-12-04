"use client";
import { Hop } from "@prisma/client";
import { HopListItem } from "./HopListItem";
import { List } from "@/components/List/List";
import { AppBarLayout } from "@/components/AppBarLayout";
import { FixedSizeList } from "react-window";
import { ListItem } from "@/components/List/ListItem";
import { ListItemText } from "@/components/List/ListItemText";
import AutoSizer from "react-virtualized-auto-sizer";
import { Badge } from "@/components/Badge";
import { BicepsFlexed, Home, SquareScissors } from "lucide-react";
import Link from "next/link";
export type HopsListProps = {
  hops?: Hop[];
};
const HopItem = ({ style, data, index }) => {
  const hop = data[index] as Hop;
  return (
    <div
      className="bg-white hover:bg-primary-500/10 p-2 even:bg-primary-foreground even:hover:bg-slate-500/10 odd:bg-slate-200 odd:hover:bg-slate-500/10"
      style={style}
    >
      <Link
        className="p-0 my-auto grid grid-cols-2"
        href={`/ingredients/hops/${hop.slug}/edit`}
      >
        <span className="block font-bold text-lg my-auto">{hop.name}</span>
        <div className="grid grid-cols-3 justify-center gap-4">
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
export function HopsList({ hops = [] }: HopsListProps) {
  return (
    <AppBarLayout
      title="Hops List"
      actions={[{ text: "New", url: "/ingredients/hops/new" }]}
    >
      <div className="w-9/12 m-auto pt-0 h-[calc(100vh-80px)]">
        <h2>Hops</h2>
        <AutoSizer>
          {({ width, height }) => (
            <FixedSizeList
              itemData={hops}
              itemCount={hops.length}
              itemSize={40}
              width={width}
              height={height - 48}
            >
              {HopItem}
            </FixedSizeList>
          )}
        </AutoSizer>
      </div>
    </AppBarLayout>
  );
}
/**{hops.map((hop) => (
          <HopListItem key={hop.id} hop={hop} />
        ))}
 */
export default HopsList;
