"use client";
import { Hop } from "@prisma/client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "slugify";
const columns: ColumnDef<Hop>[] = [
  {
    accessorKey: "name",
    header: Header<Hop>,
    cell: ({ getValue }) => (
      <Link
        href={`/ingredients/hops/${slugify(getValue<string>(), { lower: true })}`}
      >
        {getValue<string>()}
      </Link>
    ),
  },
  {
    accessorKey: "country",
    header: Header<Hop>,
  },
  {
    accessorKey: "alpha",
    header: Header<Hop>,
  },
  {
    accessorKey: "beta",
    header: Header<Hop>,
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
