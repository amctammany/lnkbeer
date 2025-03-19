"use client";
import { Style } from "@prisma/client";
//import { AppBarLayout } from "@/components/AppBarLayout";
//import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "slugify";
import { StylesTableRowActions } from "./StylesTableRowActions";
import { DataTable } from "@/components/DataTable";
const columns: ColumnDef<Style>[] = [
  {
    accessorKey: "identifier",
    header: Header<Style>,
    cell: ({ getValue }) => (
      <Link
        className="hover:underline"
        prefetch={false}
        href={`/styles/${slugify(getValue<string>(), { lower: true })}`}
      >
        {getValue<string>()}
      </Link>
    ),
  },

  {
    accessorKey: "name",
    header: Header<Style>,
    cell: ({ getValue }) => (
      <Link
        className="hover:underline"
        prefetch={false}
        href={`/styles/${slugify(getValue<string>(), { lower: true })}`}
      >
        {getValue<string>()}
      </Link>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: StylesTableRowActions<Style>,
  },
];
export type StylesTableProps = {
  src?: Style[];
};
export function StylesTable({ src = [] }: StylesTableProps) {
  return (
    <div className="relative overflow-auto">
      <DataTable data={src} columns={columns} />
    </div>
  );
}
export default StylesTable;
