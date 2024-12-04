"use client";
import { Hop } from "@prisma/client";
import { HopItem } from "./HopListItem";
import { AppBarLayout } from "@/components/AppBarLayout";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
export type HopsListProps = {
  hops?: Hop[];
};
export function HopsList({ hops = [] }: HopsListProps) {
  return (
    <AppBarLayout
      title="Hops List"
      actions={[{ text: "New", url: "/ingredients/hops/new" }]}
    >
      <div className="w-full xl:w-9/12 m-auto pt-0 h-[calc(100vh-80px)] overflow-hidden">
        <h2>Hops</h2>
        <AutoSizer>
          {({ width, height }) => (
            <FixedSizeList
              itemData={hops}
              itemCount={hops.length}
              itemSize={48}
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
