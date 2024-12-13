"use client";
import { MashProfile } from "@prisma/client";
//import { AppBarLayout } from "@/components/AppBarLayout";
//import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "slugify";
import { MashProfileRowActions } from "./MashProfileRowActions";
import { DataTable } from "@/components/DataTable";
const columns: ColumnDef<MashProfile>[] = [
  {
    accessorKey: "name",
    header: Header<MashProfile>,
    cell: ({ getValue }) => (
      <Link
        className="hover:underline"
        prefetch={false}
        href={`/profiles/mash/${slugify(getValue<string>(), { lower: true })}`}
      >
        {getValue<string>()}
      </Link>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: MashProfileRowActions<MashProfile>,
  },
];
export type MashProfilesTableProps = {
  mashProfiles?: MashProfile[];
};
export function MashProfilesTable({
  mashProfiles = [],
}: MashProfilesTableProps) {
  return (
    <div className="relative overflow-auto">
      <DataTable data={mashProfiles} columns={columns} />
    </div>
  );
  /**
  return (
    <div className="overflow-auto">
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
     */
}
export default MashProfilesTable;
