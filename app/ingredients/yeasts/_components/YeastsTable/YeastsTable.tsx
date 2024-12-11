"use client";
import { Yeast } from "@prisma/client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "slugify";
import { Plus } from "lucide-react";
import { AppBarAction } from "@/components/AppBar";
const columns: ColumnDef<Yeast>[] = [
  {
    accessorKey: "name",
    header: Header<Yeast>,
    cell: ({ getValue }) => (
      <Link
        className="hover:underline"
        prefetch={false}
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
];
export type YeastsTableProps = {
  yeasts?: Yeast[];
};
const YeastsTableActions = () => {
  return [
    <AppBarAction
      key="new"
      text="New"
      url="/ingredients/yeasts/new"
      icon={<Plus />}
    />,
  ];
};

export function YeastsTable({ yeasts = [] }: YeastsTableProps) {
  return (
    <AppBarLayout title="Yeasts List" actions={<YeastsTableActions />}>
      <div className="relative overflow-auto">
        <DataTable data={yeasts} columns={columns} />
      </div>
    </AppBarLayout>
  );
}
export default YeastsTable;
