"use client";
import { Fermentable } from "@prisma/client";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "slugify";
import { Plus } from "lucide-react";
import { AppBarItem } from "@/components/AppBarItem";
import { FermentableInput } from "@/types/ingredient";
import { AppBarLayout } from "@/components/AppBarLayout";
const columns: ColumnDef<Fermentable>[] = [
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
const FermentableTableActions = () => {
  return [<AppBarItem key="new" text="New" icon={<Plus />} />];
};
export function FermentablesTable({
  fermentables = [],
}: FermentablesTableProps) {
  return (
    <AppBarLayout
      title="Fermentables List"
      actions={<FermentableTableActions />}
    >
      <div className="relative overflow-auto">
        <DataTable data={fermentables} columns={columns} />
      </div>
    </AppBarLayout>
  );
}
export default FermentablesTable;
