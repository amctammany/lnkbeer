"use client";
import { Hop } from "@prisma/client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
const columns: ColumnDef<Hop>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "alpha",
    header: "Alpha",
  },
];
export type HopsListProps = {
  hops?: Hop[];
};
export function HopsList({ hops = [] }: HopsListProps) {
  return (
    <AppBarLayout
      title="Hops List"
      actions={[{ text: "New", url: "/ingredients/hops/new" }]}
    >
      <div>
        <DataTable data={hops} columns={columns} />
      </div>
    </AppBarLayout>
  );
}
/**{hops.map((hop) => (
          <HopListItem key={hop.id} hop={hop} />
        ))}
 */
export default HopsList;
