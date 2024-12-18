"use client";
import { Fermentable } from "@prisma/client";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Header } from "@/components/DataTable/Header";
import Link from "next/link";
import slugify from "slugify";
import { Checkbox } from "@/components/ui/checkbox";
import { HTMLProps, useEffect, useMemo, useRef } from "react";

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}
export type FermentablesTableProps = {
  fermentables?: Fermentable[];
};
export function FermentablesTable({
  fermentables = [],
}: FermentablesTableProps) {
  const cols: ColumnDef<Fermentable>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
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
    ],
    [],
  );

  return (
    <div className="relative overflow-auto">
      <DataTable data={fermentables} columns={cols} />
    </div>
  );
}
export default FermentablesTable;
