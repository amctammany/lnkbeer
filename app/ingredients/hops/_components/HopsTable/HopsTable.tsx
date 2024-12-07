"use client";
import { Hop } from "@prisma/client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "slugify";
import { Plus } from "lucide-react";
const columns: ColumnDef<Hop>[] = [
  {
    accessorKey: "name",
    header: Header<Hop>,
    cell: ({ getValue }) => (
      <Link
        className="hover:underline"
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
export type HopsTableProps = {
  hops?: Hop[];
};
export function HopsTable({ hops = [] }: HopsTableProps) {
  return (
    <AppBarLayout
      title="Hops List"
      actions={[{ text: "New", url: "/ingredients/hops/new", icon: Plus }]}
    >
      <div className="relative overflow-auto">
        <DataTable data={hops} columns={columns} />
      </div>
    </AppBarLayout>
  );
}
export default HopsTable;
