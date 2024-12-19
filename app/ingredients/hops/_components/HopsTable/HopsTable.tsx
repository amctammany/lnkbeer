"use client";
import { Hop } from "@prisma/client";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "slugify";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
export const columns: ColumnDef<Hop>[] = [
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
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Fork</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export type HopsTableProps = {
  hops?: Hop[];
};

export function HopsTable({ hops = [] }: HopsTableProps) {
  return (
    <div className="relative overflow-auto">
      <DataTable data={hops} columns={columns} />
    </div>
  );
}
export default HopsTable;
