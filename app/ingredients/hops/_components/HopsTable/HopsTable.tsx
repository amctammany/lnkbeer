"use client";
import { Hop } from "@prisma/client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
const Header: ColumnDef<Hop>["header"] = ({ column }) => {
  const Comp = column.getIsSorted() === "desc" ? ArrowUp : ArrowDown;
  return (
    <Button
      variant="ghost"
      className="w-full text-left flex"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      <span className="capitalize flex-grow">{column.id}</span>
      {column.getIsSorted() && <Comp className="ml-2 h-4 w-4" />}
    </Button>
  );
};
const columns: ColumnDef<Hop>[] = [
  {
    accessorKey: "name",
    header: Header,
  },
  {
    accessorKey: "country",
    header: Header,
  },
  {
    accessorKey: "alpha",
    header: Header,
  },
  {
    accessorKey: "beta",
    header: Header,
  },
  { accessorKey: "usage", header: Header },
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
