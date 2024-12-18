"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo, useState } from "react";
import { fuzzyFilter } from "@/lib/fuzzyFilter";
import clsx from "clsx";
import TableSearch from "./TableSearch";
import FilterInput from "./FilterInput";
import FilterSelect from "./FilterSelect";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../Badge";
import { Wheat } from "lucide-react";
import TableSelection from "./TableSelection";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filters?: any[];
  children?: React.ReactNode | React.ReactNode[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filters,
  children,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<any>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: "fuzzy",
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
      sorting,
      columnFilters,
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
  });
  const onFilterChange = useMemo(
    () => (name, value) => {
      return table.getColumn(name)?.setFilterValue(value);
    },
    [table],
  );
  return (
    <div className="w-full">
      <TableSearch table={table}>
        {filters?.map(({ name, options }) =>
          options ? (
            <FilterSelect
              key={name}
              name={name}
              value={(table.getColumn(name)?.getFilterValue() as string) ?? ""}
              options={options}
              onChange={onFilterChange}
            />
          ) : (
            <FilterInput
              key={name}
              name={name}
              value={(table.getColumn(name)?.getFilterValue() as string) ?? ""}
              onChange={onFilterChange}
            />
          ),
        )}
      </TableSearch>
      <div className="overflow-auto">
        <Table className="flex-grow border-t-2 border-gray-200">
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
                    <TableCell
                      className={clsx("foo", {
                        "text-right": cell.column.id === "actions",
                        "mx-2": cell.column.id === "actions",
                      })}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
