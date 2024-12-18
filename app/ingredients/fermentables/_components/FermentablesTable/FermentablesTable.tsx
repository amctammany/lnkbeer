"use client";
import { Fermentable } from "@prisma/client";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "slugify";

const cols: ColumnDef<Fermentable>[] = [
  {
    accessorKey: "name",
    header: Header<Fermentable>,
    cell: ({ getValue }) => (
      <Link
        className="hover:underline"
        prefetch={false}
        href={`/ingredients/fermentables/${slugify(getValue<string>(), { lower: true })}`}
      >
        {getValue<string>()}
      </Link>
    ),
  },
  {
    accessorKey: "country",
    header: Header<Fermentable>,
  },
  {
    accessorKey: "potential",
    header: Header<Fermentable>,
  },
  {
    accessorKey: "power",
    header: Header<Fermentable>,
  },
  { accessorKey: "usage", header: Header },
];
export type FermentablesTableProps = {
  fermentables?: Fermentable[];
};
export function FermentablesTable({
  fermentables = [],
}: FermentablesTableProps) {
  "use no memo";
  return (
    <div className="relative overflow-auto">
      <DataTable data={fermentables} columns={cols} />
    </div>
  );
}
export default FermentablesTable;
