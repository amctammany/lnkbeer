"use client";
import { Hop } from "@prisma/client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "slugify";
import { Plus } from "lucide-react";
import { AppBarAction } from "@/components/AppBar";
const columns: ColumnDef<Hop>[] = [
  {
    accessorKey: "name",
    header: Header<Hop>,
    cell: ({ getValue }) => (
      <Link
        className="hover:underline"
        prefetch={false}
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
const HopsTableActions = () => {
  return [
    <AppBarAction
      key="new"
      url="/ingredients/hops/new"
      text="New"
      icon={<Plus />}
    />,
  ];
};

export function HopsTable({ hops = [] }: HopsTableProps) {
  return (
    <AppBarLayout title="Hops List" actions={<HopsTableActions />}>
      <div className="relative overflow-auto">
        <DataTable data={hops} columns={columns} />
      </div>
    </AppBarLayout>
  );
}
export default HopsTable;
