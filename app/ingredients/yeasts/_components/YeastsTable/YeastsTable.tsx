"use client";
import { Yeast, YeastFlocculation } from "@prisma/client";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "slugify";
//import { FlaskConical, Plus } from "lucide-react";
//import { AppBarItem } from "@/components/AppBarItem";
//import { AppBarLayout } from "@/components/AppBarLayout";
//import AppBarTitle from "@/components/AppBarTitle";
//import FilterInput from "@/components/DataTable/FilterInput";
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
    filterFn: "equals",
  },
];
export type YeastsTableProps = {
  yeasts?: Yeast[];
};

export function YeastsTable({ yeasts = [] }: YeastsTableProps) {
  return (
    <div className="relative overflow-auto">
      <DataTable
        data={yeasts}
        columns={columns}
        filters={[
          { name: "manufacturer" },
          { name: "flocculation", options: YeastFlocculation },
        ]}
      />
    </div>
  );
}
export default YeastsTable;
