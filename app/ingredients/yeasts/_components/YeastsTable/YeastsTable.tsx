"use client";
import { Yeast } from "@prisma/client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "slugify";
import { Plus } from "lucide-react";
const columns: ColumnDef<Yeast>[] = [
  {
    accessorKey: "name",
    header: Header<Yeast>,
    cell: ({ getValue }) => (
      <Link
        className="hover:underline"
        href={`/ingredients/yeasts/${slugify(getValue<string>(), { lower: true })}`}
      >
        {getValue<string>()}
      </Link>
    ),
  },
  {
    accessorKey: "manufacturer",
    header: Header<Yeast>,
  },
  {
    accessorKey: "attenuation",
    header: Header<Yeast>,
  },
  {
    accessorKey: "flocculation",
    header: Header<Yeast>,
  },
  { accessorKey: "usage", header: Header },
];
export type YeastsTableProps = {
  yeasts?: Yeast[];
};
export function YeastsTable({ yeasts = [] }: YeastsTableProps) {
  return (
    <AppBarLayout
      title="Yeasts List"
      actions={[{ text: "New", url: "/ingredients/yeasts/new", icon: Plus }]}
    >
      <DataTable data={yeasts} columns={columns} />
    </AppBarLayout>
  );
}
export default YeastsTable;
