import { Hop } from "@prisma/client";
import { HopListItem } from "./HopListItem";
import { List } from "@/components/List/List";
import { AppBarLayout } from "@/components/AppBarLayout";

export type HopsListProps = {
  hops?: Hop[];
};
export function HopsList({ hops = [] }: HopsListProps) {
  return (
    <AppBarLayout
      title="Hops List"
      actions={[{ text: "New", url: "/ingredients/hops/new" }]}
    >
      <List>
        {hops.map((hop) => (
          <HopListItem key={hop.id} hop={hop} />
        ))}
      </List>
    </AppBarLayout>
  );
}

export default HopsList;
