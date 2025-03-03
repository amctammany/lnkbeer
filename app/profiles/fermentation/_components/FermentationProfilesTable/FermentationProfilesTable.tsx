"use client";
import { FermentationProfile } from "@prisma/client";
//import { AppBarLayout } from "@/components/AppBarLayout";
//import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "slugify";
import { FermentationProfileRowActions } from "./FermentationProfileRowActions";
import { DataTable } from "@/components/DataTable";
const columns: ColumnDef<FermentationProfile>[] = [
  {
    accessorKey: "name",
    header: Header<FermentationProfile>,
    cell: ({ getValue }) => (
      <Link
        className="hover:underline"
        prefetch={false}
        href={`/profiles/fermentation/${slugify(getValue<string>(), { lower: true })}`}
      >
        {getValue<string>()}
      </Link>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: FermentationProfileRowActions<FermentationProfile>,
  },
];
export type FermentationProfilesTableProps = {
  src?: FermentationProfile[];
};
export function FermentationProfilesTable({
  src = [],
}: FermentationProfilesTableProps) {
  return (
    <div className="relative overflow-auto">
      <DataTable data={src} columns={columns} />
    </div>
  );
  /**
  return (
    <div className="overflow-auto">
      <Table className="grow">
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
     */
}
export default FermentationProfilesTable;
