"use client";
import { MashStep } from "@prisma/client";
import { AppBarLayout } from "@/components/AppBarLayout";
import { DataTable } from "@/components/DataTable";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "slugify";
import { ArrowDown, ArrowUp, Plus } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { fuzzyFilter } from "@/lib/fuzzyFilter";
import { useState } from "react";
import { ExtendedMashStep } from "@/types/Profile";
import { Button } from "@/components/ui/button";
const columns: ColumnDef<ExtendedMashStep>[] = [
  {
    id: "link",
    accessorFn: (row) =>
      `/profiles/mash/${row.MashProfile.slug}/edit/${row.id}`,
    header: ({ column }) => {
      const Comp = column.getIsSorted() === "desc" ? ArrowUp : ArrowDown;
      return (
        <Button
          variant="ghost"
          className="w-full text-left flex"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="capitalize flex-grow">Name</span>
          {column.getIsSorted() && <Comp className="ml-2 h-4 w-4" />}
        </Button>
      );
    },
    cell: ({ getValue, row }) => (
      <Link
        className="hover:underline"
        prefetch={false}
        href={row.getValue("link")}
      >
        {row.getValue("name")}
      </Link>
    ),
  },
  { accessorKey: "name", header: Header<ExtendedMashStep> },
  { accessorKey: "type", header: Header<ExtendedMashStep> },
  { accessorKey: "temperature", header: Header<ExtendedMashStep> },
  { accessorKey: "time", header: Header<ExtendedMashStep> },
  { accessorKey: "rampTime", header: Header<ExtendedMashStep> },
  { accessorKey: "mashProfileId", header: Header<ExtendedMashStep> },
  { accessorKey: "id", header: Header<ExtendedMashStep> },
];
export type MashStepsTableProps = {
  mashSteps?: ExtendedMashStep[];
};
export function MashStepsTable({ mashSteps = [] }: MashStepsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: mashSteps,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: "fuzzy",
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
    initialState: {
      columnVisibility: {
        link: true,
        name: false,
        type: true,
        temperature: true,
        time: true,
        rampTime: true,
        mashProfileId: false,
        id: false,
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });
  console.log(mashSteps);

  return (
    <div className="overflow-x-scroll">
      <Table className="flex-grow">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
export default MashStepsTable;
