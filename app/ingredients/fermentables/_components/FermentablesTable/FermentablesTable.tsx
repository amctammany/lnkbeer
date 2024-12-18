"use client";
"use no memo";
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
  }, [ref, rest.checked, indeterminate]);

  console.log(ref);
  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}
const cols: ColumnDef<Fermentable>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
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
];
export type FermentablesTableProps = {
  fermentables?: Fermentable[];
};
export function FermentablesTable({
  fermentables = [],
}: FermentablesTableProps) {
  "use no memo";
  return (
    <div className="relative overflow-auto">
      <DataTable data={fermentables} columns={cols} />
    </div>
  );
}
export default FermentablesTable;
